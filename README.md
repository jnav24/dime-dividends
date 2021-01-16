# Dime Dividend Tracker

Dime Dividend Tracker is a tool to track your dividend income, set dividend income goals, and to keep up to date on the next payout dates. This app was built using Laravel, Inertia, React, Typescript, TailwindCSS, and PostgreSQL.

**Status:** in development

## Screenshots

![screenshot: dashboard page](https://dimebudget.app/images/dividends_dashboard_screenshot.png)

## Requirements

This project is using Node version 14.15.1, Php 8 and PostgreSQL 13.1. Please ensure you are using the most compatible versions of these languages on your server to ensure the app runs smoothly. If you have Docker installed, then you can just run the following:

```
docker-compose build
```

## Getting Started

Create an .env file and enter the following credentials:

```
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=<enter_your_database_name>
DB_USERNAME=<enter_your_database_username>
DB_PASSWORD=<enter_your_database_password>
```

Since this project is using Php 8, it is recommended to have Composer version 2 installed. 

```
composer install
npm install
```

Compiled the front end

```
npm run dev
```

Run the app

```
docker-compose up
```

Lastly, you will need to run the migrations.

```
docker exec -it dime-dividends_php_1 /bin/bash
php artisan migrate
```
Once Docker is running, you can view the project [here](http://localhost:8080)

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
