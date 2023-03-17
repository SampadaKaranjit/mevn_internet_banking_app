# MEVN Internet Banking application

> A simple app built with the MEVN stack & Typescript

## Features

- Login with JWT authentication
- View a list of transfers
- View transfer item details
- Create a new transfer
- A simple data collection library to collect keyboard and mouse events
- Database seeder (transfer (sample data) & users (sample for login))

## Usage

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'

```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Seed Database

You can use the following commands to seed the database with some sample transfer data. At the moment, there is no registration feature enabled, so import the sample data using these commands in order to have a login user available

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Login

admin@example.com
123456

```

### Run

```
# Run frontend & backend (:5000)
npm run dev

# Run backend only
npm run server
```
