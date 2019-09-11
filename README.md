# laravel-stencil
Laravel back end with a StencilJS front PWA

# Laravel (back end) installation

Clone this repository, configure the webserver to serve from `/public`

Install dependencies:

`composer install`

# PWA (front end) installation
The front end is a StencilJS PWA located in `/frontend` which will build to the `/public` directory

Install the node_modules dependencies

    cd frontend
    npm install

Copy the `/frontend/.env.example` to `/frontend/.env` and add the required variables

# Build the front end

    cd frontend
    npm run prod
