# PizzaTask

PizzaTask - web application for ordering pizza

My first web application on React.JS

Using Laravel-React SPA

Demo: https://pizzatask.herokuapp.com/

Links:

Template -  https://github.com/zaichaopan/laravel-react-spa
MySQL Hosting - https://remotemysql.com/
Cloud Hosting - https://heroku.com/

## Instalation on Heroku

https://devcenter.heroku.com/articles/getting-started-with-laravel

## Run local

## Installation

- Clone the repo
- Installing all Composer & NPM dependencies.

```bash
composer install && npm install
```

- Copy .env.example to .env
- Generate app key

```bash
php artisan key:generate
```

- Config database in .env
- Run database migration

```bash
php artisan migrate:fresh --seed
```

- Generate JWT secret

```bash
php artisan jwt:secret
```

- Compiling Assets

```bash
npm run dev
```

- Boot up a server

```bash
php artisan serve
```