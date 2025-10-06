import { env } from '#env';
import ck from "chalk";
import { runCommand } from "#utils";

// --nsInclude=dbname.collectioname

export async function discloudToAtlas() {
    console.log(ck.blue(`Exporting database from discloud to mongodb atlas.`));
    const dumpCommand = `mongodump --uri="${env.LOCALHOST_URI}" ${env.DB_NAME ? `--db=${env.DB_NAME}` : ""} ${env.COLLECTION_NAME ? `--collection=${env.COLLECTION_NAME}` : ""} --out=${env.OUT_DIR}`;
    const exportCommand = `mongorestore --uri="${env.ATLAS_URI}" ${env.OUT_DIR}/`;

    await runCommand(dumpCommand);
    await runCommand(exportCommand);
}

export async function atlasToDiscloud() {
    console.log(ck.blue(`Exporting database from mongodb atlas to discloud.`));
    const dumpCommand = `mongodump --uri="${env.ATLAS_URI}" ${env.DB_NAME ? `--db=${env.DB_NAME}` : ""} ${env.COLLECTION_NAME ? `--collection=${env.COLLECTION_NAME}` : ""} --out=${env.OUT_DIR}`;
    const exportCommand = `mongorestore --uri="${env.LOCALHOST_URI}" ${env.OUT_DIR}/`;

    await runCommand(dumpCommand);
    await runCommand(exportCommand);
}