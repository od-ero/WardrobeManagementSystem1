Wardrobemanagement systerm
## Introduction

This repository is the front end implemntantion of the project

## Official Documentation

### Installation

How to install back end

```bash
# Create the Laravel application...
laravel new next-backend

clone/down load the backend from git@github.com:od-ero/WardrobeManagementSystem.git

navigate to the backend folder.

make a copy of .env.example as .env

you can generate key.

Remember to configure the databes appropriately in the env for mycase it was mysql.


# Run database migrations...
php artisan migrate
``
Run database seeder`

php artisan db:seed 

Next, ensure that your application's `APP_URL` and `FRONTEND_URL` environment variables are set to `http://localhost:8000` and `http://localhost:3000`, respectively.

After defining the appropriate environment variables, you may serve the Laravel application using the `serve` Artisan command:

```bash
# Serve the application...
php artisan serve
```

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env.local` and supply the URL of your backend:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Finally, run the application via `npm run dev`. The application will be available at `http://localhost:3000`:

```
npm run dev
```

> Note: Currently, we recommend using `localhost` during local development of your backend and frontend to avoid CORS "Same-Origin" issues.

> Note: You will need to use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) (`user?.name` instead of `user.name`) when accessing properties on the user object to account for Next.js's initial server-side render.

### Named Routes

