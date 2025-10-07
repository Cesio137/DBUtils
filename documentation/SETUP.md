# Setup

## Prerequisites

- [Node.js (v22 LTS or higher)](https://nodejs.org/)
- [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools)

## Environment Variables

Create a `.env` file in the root of the project and add the following variables:

- `TASK`: The script's task. Use `import` to import data or `export` to export data.

#### MongoDB

- `MONGO_DB_NAME`: **(Optional)** The name of the database to connect to.
- `MONGO_COLLECTION_NAME`: **(Optional)** The name of the collection to use. Requires `MONGO_DB_NAME` to be set.
- `MONGO_LOCALHOST_URI`: The connection URI for your local MongoDB instance.
- `ATLAS_URI`: The connection URI for your MongoDB Atlas cluster.
- `MONGO_OUT_DIR`: The directory path to save exported data.