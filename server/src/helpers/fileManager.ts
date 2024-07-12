import { Controller } from 'tsoa';
import * as asyncFileSystem from 'fs/promises';
import * as fileSystem from 'fs';
import internal from 'stream';
import latex from 'node-latex';
import { randomUUID } from 'crypto';
import { ApiError, HTTPStatus } from './customError';
import dotenv from 'dotenv';
import { ReadStream } from 'fs';
import { Language } from '../services/letterService';

dotenv.config({ path: '.env' });

export enum ReturnFileType {
  PDF = 'PDF',
  TEX = 'TEX'
}

export enum Stationery {
  BAC = 'BAC',
  GEWIS = 'GEWIS'
}

export interface FileSettings {
  name: string;
  language: Language;
  fileType: ReturnFileType;
  stationery?: string;
  createdAt: Date;
}

/**
 * Delete the file from the system at the given path
 * @param filePath {string} Path to the file
 */
export async function deleteFile(filePath: string): Promise<void> {
  await asyncFileSystem.unlink(filePath);
}

/**
 * Add the file to the response object, given the controller that handles the request
 * @param controller {Controller} Controller that handles the request
 * @param filePath {string} Path to the file
 */
export function prepareFileResponse(
  controller: Controller,
  filePath: string
): fileSystem.ReadStream {
  const stat: fileSystem.Stats = fileSystem.statSync(filePath);

  controller.setStatus(200);
  controller.setHeader('Content-Type', `application/${filePath.split('.').pop()}`);
  controller.setHeader('Content-Length', stat.size.toString());
  controller.setHeader('Content-Disposition', `attachment; filename="${filePath}"`);

  let fileResponse: ReadStream = fileSystem.createReadStream(filePath);
  fileResponse.on('close', async () => {
    await deleteFile(filePath);
  });

  return fileResponse;
}

/**
 * Save a text file string (or .tex string) to the disk at the given path
 * @param file {string} File contents parsed to a string
 * @param filePath {string} Path to the file
 */
export async function saveFileToDisk(file: string, filePath: string): Promise<void> {
  await asyncFileSystem.writeFile(filePath, file);
}

/**
 * Convert a given .tex file to a PDF and save it at the given path
 * @param file {string} Input "file" in a string
 * @param filePath {string} Path to the file
 * @param templateDir {string} Location of all templates
 * @returns {string} The absolute location of the new .pdf file
 */
export async function convertTexToPdf(
  file: string,
  filePath: string,
  templateDir: string
): Promise<void> {
  return new Promise(async (resolve, reject): Promise<void> => {
    const output: fileSystem.WriteStream = fileSystem.createWriteStream(filePath);
    const pdf: internal.Transform = latex(file, {inputs: templateDir, passes: 3});
    await new Promise(resolve => setTimeout(resolve, 500));

    pdf.pipe(output);
    pdf.on('error', (err: Error) => reject(err));
    pdf.on('finish', () => resolve());
  });
}

/**
 * Wrap up the file generation: generating a filename, saving to the proper location on disk
 * @param file {string} The .tex file parsed as a string
 * @param fileType {ReturnFileType} The file type that should be returned
 * @param workDir {string} Location to temporarily save the file to
 * @param templateDir {string} Location of template files
 */
export default async function finishFileGeneration(
  file: string,
  fileType: ReturnFileType,
  workDir: string,
  templateDir: string
): Promise<string> {
  let filePath: string = workDir + randomUUID();

  if (fileType === ReturnFileType.TEX) {
    filePath += '.tex';
    await saveFileToDisk(file, filePath);
  } else if (fileType === ReturnFileType.PDF) {
    filePath += '.pdf';
    await convertTexToPdf(file, filePath, templateDir).catch((e: Error): void => {
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'Ran into an issue when converting to PDF. \n\n' + e
      );
    });
  }
  return filePath;
}
