import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
  Express
} from 'express';
// eslint-disable-next-line
import { RegisterRoutes } from './routes';
import dotenv from 'dotenv';
import { ValidateError } from 'tsoa';
import bodyParser from 'body-parser';
import { ApiError } from './helpers/customError';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './public/swagger.json';
import path from 'path';

dotenv.config({ path: '.env' });

const PORT: number = parseInt(process.env.PORT!) || 3001;

export function setupErrorHandler(app: Express) {
  app.use(function notFoundHandler(_req, res: ExResponse) {
    res.status(404).send({
      message: 'Not Found'
    });
  });

  app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
  ): ExResponse | void {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields
      });
    }
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        message: err.name,
        details: err.message
      });
    }

    next();
  });
}

const app: Express = express();

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.use('/pdf/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/pdf/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, './public/swagger.json'));
});

RegisterRoutes(app);
setupErrorHandler(app);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
