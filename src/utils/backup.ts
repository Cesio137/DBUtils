import cron from "node-cron";
import { dbxUpload, megaUpload, runCommand } from "#utils";
import ck from "chalk";
import { env } from "#env";

export async function dump(): Promise<string> {
    console.log(ck.blue(`Exporting database from discloud.`));
    const dumpCommand = `mongodump --uri="${env.MONGO_LOCALHOST_URI}" ${env.MONGO_DB_NAME ? `--db=${env.MONGO_DB_NAME}` : ""} ${env.MONGO_COLLECTION_NAME ? `--collection=${env.MONGO_COLLECTION_NAME}` : ""} --out=${env.MONGO_OUT_DIR}`;
    const backupDate = new Date().toISOString().split("T")[0];
    const zipName = `backup_discloud${env.MONGO_DB_NAME ? `_${env.MONGO_DB_NAME}` : ""}${env.MONGO_COLLECTION_NAME ? `_${env.MONGO_COLLECTION_NAME}` : ""}_${backupDate}`;
    const zipCommand = `zip -r ${zipName}.zip ${env.MONGO_OUT_DIR.startsWith("./") ? env.MONGO_OUT_DIR.slice(2) : env.MONGO_OUT_DIR}`
    await runCommand(dumpCommand);
    await runCommand(zipCommand);
    return zipName;
}

export async function backup() {
    console.log(ck.blue("Performing first backup."));



    switch (env.PLATFORM) {
        case "dropbox":
            await dbxUpload();
            if (env.SCHEDULE === "* * * * * *")
                return;
            console.log(ck.blue("Scheduling cronjb."))
            cron.schedule(env.SCHEDULE, async function () {
                await dbxUpload();
            });
            break;
        case "mega":
            await megaUpload();
            if (env.SCHEDULE === "* * * * * *")
                return;
            console.log(ck.blue("Scheduling cronjb."))
            cron.schedule(env.SCHEDULE, async function () {
                await megaUpload();
            });
            break;
    }
}