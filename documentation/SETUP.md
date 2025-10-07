# Setup Documentation

## Download and Install

- [Nodejs 22 LTS or above](https://nodejs.org/)

## Config .env

#### PLATAFORM
- values: "dropbox" or "mega"

#### SCHEDULE
- value = "* * * * * *"
   ```
    # ┌────────────── second (optional)
    # │ ┌──────────── minute
    # │ │ ┌────────── hour
    # │ │ │ ┌──────── day of month
    # │ │ │ │ ┌────── month
    # │ │ │ │ │ ┌──── day of week
    # │ │ │ │ │ │
    # │ │ │ │ │ │
    # * * * * * *
    ```
    | field        | value                             |
    | ------------ | --------------------------------- |
    | second       | 0-59                              |
    | minute       | 0-59                              |
    | hour         | 0-23                              |
    | day of month | 1-31                              |
    | month        | 1-12 (or names)                   |
    | day of week  | 0-7 (or names, 0 or 7 are sunday) |

#### MongoDB

- `MONGO_DB_NAME`: **(Optional)** The name of the database to connect to.
- `MONGO_COLLECTION_NAME`: **(Optional)** The name of the collection to use. Requires `MONGO_DB_NAME` to be set.
- `MONGO_LOCALHOST_URI`: The connection URI for your local MongoDB instance.
- `MONGO_OUT_DIR`: The directory path to save exported data.


#### DRIVEPATH

- Defines the destination path for the uploaded file within the cloud storage service.
- Use a full path format like `/` for store in root or `/<folder name>` to store inside a folder

#### DROPBOX_TOKEN

- Set your dropbox app token.
- Setup an app [here](https://www.dropbox.com/developers/apps)
- 
#### MEGA_EMAIL

- Set your mega email.

#### MEGA_PASS

- Set your mega password.

## Scripts

```bash
npm run dev
# or
npm run build
# or
npm run start
```
