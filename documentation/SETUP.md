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

#### FILEPATH

- Specifies the local path to the file intended for upload.
- If the file is located in the root directory, simply provide the filename (e.g., `text.txt`).
- If the file resides within a subdirectory, use a relative path format such as `./example/text.txt.`


#### DRIVEPATH

- Defines the destination path for the uploaded file within the cloud storage service.
- For Dropbox, use a full path format like `/example/text.txt.`

#### CHUNK_SIZE

- Defines max size of chunk when stream a big file.

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
