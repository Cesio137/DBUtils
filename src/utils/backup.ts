import cron from "node-cron";
import { dbxUpload, megaUpload } from "#utils";
import ck from "chalk";
import { env } from "#env";

export async function backup() {
    console.log(ck.blue("Performing first backup."))
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