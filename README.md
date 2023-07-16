<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/martinbobbio/frontend-challenge-meli/master/src/assets/images/branding/logo-ml%402x.png" alt="Tenisstar" width="200">
  <br>
  <a href="https://backend-challenge-meli.vercel.app/">
  Challenge Mercado Libre - Backend
  </a>
  <br>
  <br>
</h1>
<h4 align="center">
  <a href="https://github.com/martinbobbio/frontend-challenge-meli">Challenge Mercado Libre - Frontend</a>
</h4>

## Description

This project is a backend API developed using Node.js with TypeScript and Express. It utilizes Axios for making HTTP requests and Dotenv for managing environment variables. The API interacts with the Mercado Libre API to retrieve item information based on search parameters.

## Getting started

1. Clone the repository:

```bash
git clone https://github.com/martinbobbio/backend-challenge-meli
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file in the root directory of the project and add the following environment variables:

```plaintext
PORT=<port-number>
API_URL_MELI=<meli-api-url>
```

Replace <port-number> with the desired port number for the server to run on (e.g., 3000) and <meli-api-url> with the URL of the Mercado Libre API.

4. Start the server

```bash
npm start
```

5. The API will be accessible at http://localhost:<port-number>/api.

### Item List

- URL: `/api/items`
- Method: `GET`
- Description: Getting item list information from the Mercado Libre API based on search parameters.
- Query Parameters:
- - `search` (Required) The search query
- - `firstname` (Required) Firstname for sign
- - `lastname` (Required) Lastname for sign
- Body:

```JSON
{
  "author": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "categories": ["Category1", "Category2", "Category3"],
  "items": [
    {
      "id": "item1",
      "title": "Item 1",
      "picture": "item1.jpg",
      "condition": "New",
      "free_shipping": true,
      "place": "State",
      "price": {
        "currency": "$",
        "amount": 10,
        "decimals": 0
      }
    },
    // ...
  ]
}
```

### Item Detail

- URL: `/api/items/:id`
- Method: `GET`
- Description: Getting item detail information from the Mercado Libre API based on the item ID.
- Query Parameters:
- - `firstname` (Required) Firstname for sign
- - `lastname` (Required) Lastname for sign

- Body:

```JSON
{
  "author": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "categories": ["Category1", "Category2", "Category3"],
  "item": {
    "id": "item1",
    "title": "Item 1",
    "picture": "item1.jpg",
    "condition": "New",
    "free_shipping": true,
    "sold_quantity": 10,
    "description": "Item description",
    "price": {
      "currency": "$",
      "amount": 10,
      "decimals": 0
    }
  }
}
```

## Scripts

- `npm start`: Builds the TypeScript files and starts the server using `node`
- `npm start`: Starts the server in development mode using `nodemon`.
- `npm run build`: Builds the TypeScript files to the `dist` directory.
