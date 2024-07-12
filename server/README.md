# PDF-generator
Simple application that allows to generate PDF-files using LaTeX for GEWIS applications (ParelPracht and SudoSOS). This is the server part of the application, to which API requests can be sent to generate and download PDF files.

# Initial setup

## Environment 
All information for running the application is encapsulated in the `.env.example` file. Copy and rename this file to `.env` and change any of the values to whatever is desired. In the rest of the setup, the variables will be referenced for clarity.

## Application setup
With all prerequisites out of the way, you are now able to build the application. In the future, it will also be possible to build the project using Docker.

- Run `yarn install` to install all dependencies
- Run `yarn run generate:middleware` to build the routes and the swagger file
- Run `yarn run build` to build the application
- Run `yarn run serve` to start the application

## LaTeX
The application uses the node-latex package to generate PDFs, which is dependent on the TeX distribution on your machine. If you have no TeX distribution installed, you will not be able to generate any PDFs. Depending on your operating system, either MiKTeX or TeX Live is advised. However, any other TeX distribution will also suffice.

- For Windows, you can use MiKTeX. An installer is available on [their website](https://miktex.org/download). If you use [Chocolatey](https://community.chocolatey.org/packages/miktex), run `choco install miktex` in the terminal to install the distribution.
- For Linux, you can use TeX Live. Run `apt-get install -y --no-install-recommends texlive-latex-recommended texlive-latex-extra texlive-fonts-recommended texlive-fonts-extra texlive-lang-all` in the terminal to install the distribution.

# Development
For development, there is a separate script that you can run. This script will rebuild the project on any changes.

- Run `yarn start dev`

# Docker
You can also build and run the application using Docker. This is mostly relevant for deployment. The details can be found in `Dockerfile`, and you can build an image using `docker build . -t pdf-gen:latest`.

If you want to test the image locally, you can use `docker run -d -p 3001:3001 --env-file ./.env pdf-gen node /usr/src/app/build/index.js` to run image as container.

# Spec and routes
All routes are served on `/pdf/{route}`. Furthermore, the specifications are available on `/pdf/swagger`.

# Scripts
Almost all scripts are already mentioned above, but there are also some more. All scripts are listed here for the sake of a good overview.

- `yarn run lint`: lists all the linter errors present in `src/**/*`
- `yarn run lint:fix`: fixes all the linter errors present in `src/**/*`.
- `yarn run prettier`: lists all the prettier errors present in `src/**/*`
- `yarn run prettier:fix`: fixes all the prettier errors present in `src/**/*`.
- `yarn run build`: compile the project based on `tsconfig.json`. Results will be placed in `build`.
- `yarn run serve`: serves the project. Based on `build`.
- `yarn run dev`: starts the development environment. This script uses nodemon to watch files in `src/**/*` and rebuilds the project when there are changes. It also watches `src/controllers/**/*` to regenerate the routes when changes occur.
- `yarn run generate:middleware`: generates the `routes.ts` and `swagger.json` files using tsoa.
- `yarn run generate:client`: generates the client for the gitmodule.
- `yarn run release`: generates the client, pushes and updates references to the gitmodule.