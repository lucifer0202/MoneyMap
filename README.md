# MoneyMap

# Personal Budget Tracker API

This is a backend API for a Personal Budget Tracker application built with Node.js, Express, Sequelize (with PostgreSQL), and other useful tools. The project allows users to track their financial transactions, import CSV/XLSX files, and process transactions via webhooks from SMS notifications.

## Features

- **Create Transaction**: Add a new transaction with a description, amount, and date.
- **List Transactions**: Fetch a list of all transactions for the authenticated user.
- **Webhook**: Automatically capture transactions from incoming SMS messages (via webhook).
- **File Import**: Import transactions from CSV or XLSX files.
- **JWT Authentication**: Secure access to endpoints with JSON Web Token (JWT).

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for routing and handling requests.
- **Sequelize**: ORM to interact with PostgreSQL database.
- **PostgreSQL**: Database for storing transactions.
- **JWT**: Authentication using JSON Web Tokens.
- **Multer**: File handling middleware (for CSV/XLSX imports).
- **XLSX Parser**: For parsing and reading data from Excel files.
- **CSV-Parser**: For reading CSV files.
