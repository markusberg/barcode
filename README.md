# Barcode

Web application for generating barcodes for DLT and LTO tapes.

The backend is Node.JS, Express.JS and TypeScript

The frontend is Angular.

## Docker/Podman

The easiest way to try this out is to use a container with Docker or Podman. Download the code, and build an image

`$ docker build --tag=barcode .`

or if you have Node.JS installed there's a script:

`$ npm run build:docker`

Next, create a `.env` file. If empty, the generator defaults to serving from the root of port 3110. Have a look at `.env.template` to see what variables are available.

You can now load the image in a container by running:

`$ docker-compose up`
