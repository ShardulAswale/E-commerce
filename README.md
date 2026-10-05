# E-Commerce Frontend

React, Redux and Material UI shopping dashboard built with Vite.

## How it works

The application fetches products from Fake Store API, manages cart quantities in Redux and saves cart, login and order data in browser local storage. Routes display products, cart, login, users, invoices and orders. A secondary product view selects categories represented in the cart and excludes items already added.

## Usage

Requires Node.js and npm. From the repository root:

```sh
npm install
npm run dev
```

Open the address printed by Vite. `npm run build` writes the static production files to `dist/`.

Internet access is required for product loading from the external API.

## Notes

Login checks the demonstration credentials `admin` / `admin` in frontend code. Orders and invoices are local simulations; no payment processing or application backend is included.
