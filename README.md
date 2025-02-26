Wardrobemanagement systerm
## Introduction

This repository is the front end implemntantion of the project

## Official Documentation

### Installation

How to install backend

```bash
# Clone the Laravel application...


clone/download the backend from [git@github.com:od-ero/WardrobeManagementSystem.git
](https://github.com/od-ero/WardrobeManagementSystem.git)
navigate to the backend folder.

copy the .env attarched in the root folder of backend


Remember to configure the databes appropriately in the env for mycase it was mysql.

 #install composure
composer install
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

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.local` to frontend root and supply the URL of your backend:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Finally, run the application via `npm run dev`. The application will be available at `http://localhost:3000`:

```
npm run dev
```


