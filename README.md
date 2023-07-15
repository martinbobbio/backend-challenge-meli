# Backend Challenge - Mercado Libre

Backend challenge project for Mercado Libre.

## Description

This project is a backend API developed using Node.js with TypeScript and Express. It utilizes Axios for making HTTP requests and Dotenv for managing environment variables. The API interacts with the Mercado Libre API to retrieve item information based on search parameters.

## Getting started

1. Clone the repository:

```bash
git clone <repository-url>
npm install
```

2. Create a .env file in the root directory of the project and add the following environment variables:

```plaintext
PORT=<port-number>
API_URL_MELI=<meli-api-url>
```

Replace <port-number> with the desired port number for the server to run on (e.g., 3000) and <meli-api-url> with the URL of the Mercado Libre API.

3. Start the server

```bash
npm start
```

4. The API will be accessible at http://localhost:<port-number>/api.

## Scripts

- `npm start`: Builds the TypeScript files and starts the server using `node`
- `npm start`: Starts the server in development mode using `nodemon`.
- `npm run build`: Builds the TypeScript files to the `dist` directory.
