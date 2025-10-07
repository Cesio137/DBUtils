import { env } from '#env';
import ck from "chalk";
import { runCommand } from "#utils";

// --nsInclude=dbname.collectioname

export async function discloudToAtlas() {
    console.log(ck.blue(`Exporting database from discloud to mongodb atlas.`));
    const dumpCommand = `mongodump --uri="${env.MONGO_LOCALHOST_URI}" ${env.MONGO_DB_NAME ? `--db=${env.MONGO_DB_NAME}` : ""} ${env.MONGO_COLLECTION_NAME ? `--collection=${env.MONGO_COLLECTION_NAME}` : ""} --out=${env.MONGO_OUT_DIR}`;
    const exportCommand = `mongorestore --uri="${env.ATLAS_URI}" ${env.MONGO_OUT_DIR}/`;

    await runCommand(dumpCommand);
    await runCommand(exportCommand);
}

export async function atlasToDiscloud() {
    console.log(ck.blue(`Exporting database from mongodb atlas to discloud.`));
    const dumpCommand = `mongodump --uri="${env.ATLAS_URI}" ${env.MONGO_DB_NAME ? `--db=${env.MONGO_DB_NAME}` : ""} ${env.MONGO_COLLECTION_NAME ? `--collection=${env.MONGO_COLLECTION_NAME}` : ""} --out=${env.MONGO_OUT_DIR}`;
    const exportCommand = `mongorestore --uri="${env.MONGO_LOCALHOST_URI}" ${env.MONGO_OUT_DIR}/`;

    await runCommand(dumpCommand);
    await runCommand(exportCommand);
}