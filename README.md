# Airbnb Backend CRUD Operations

## Project Overview

This project is a basic implementation of CRUD (Create, Read, Update, Delete) operations for managing Airbnb listings. It serves as the backend for an Airbnb-like application, providing RESTful API endpoints to handle various operations related to property listings.

## Features

- **Create**: Add new property listings.
- **Read**: Retrieve details of existing property listings.
- **Update**: Modify details of existing property listings.
- **Delete**: Remove property listings.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing property listings.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdulRaffayQureshi/Backend-Setup-CRUD.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Backend-Setup-CRUD
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. The server will run on `http://localhost:3000`.

## API Endpoints

- **Create a new listing**
  - `POST /api/listings`
  - Request body:
    ```json
    {
      "title": "Beautiful Beach House",
      "description": "A lovely beach house with sea view.",
      "price": 200,
      "location": "California"
    }
    ```

- **Get all listings**
  - `GET /api/listings`

- **Get a single listing by ID**
  - `GET /api/listings/:id`

- **Update a listing by ID**
  - `PUT /api/listings/:id`
  - Request body (example):
    ```json
    {
      "price": 250
    }
    ```

- **Delete a listing by ID**
  - `DELETE /api/listings/:id`

## Edit Listing Form

Here's an example of an HTML form to edit a listing:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wanderlust</title>
  </head>
  <body>
    <h3>Edit your Listing</h3>
    <form method="POST" action="/listings/<%= listing._id %>?_method=PUT">
      <input name="listing[title]" value="<%= listing.title %>" type="text" />
      <br /><br />
      <textarea name="listing[description]">
<%= listing.description %></textarea>
      <br /><br />
      <input name="listing[image]" value="<%= listing.image %>" type="text" />
      <br /><br />
      <input name="listing[price]" value="<%= listing.price %>" type="number" />
      <br /><br />
      <input name="listing[country]" value="<%= listing.country %>" type="text" />
      <br /><br />
      <input name="listing[location]" value="<%= listing.location %>" type="text" />
      <br /><br />
      <button>Edit</button>
    </form>
  </body>
</html>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any inquiries or feedback, please contact qureshiabdulraffay@gmail.com.
