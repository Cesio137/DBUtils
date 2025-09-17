import cron from "node-cron";
import { config } from '#helpers';
import { upload } from "#utils";
import ck from "chalk";

export async function backup() {
    console.log(ck.blue("Performing first backup."))
    await upload();
    console.log(ck.blue("Scheduling cronjb."))
    cron.schedule(`${config.cronjb.seconds} ${config.cronjb.minutes} ${config.cronjb.hours} ${config.cronjb.days} ${config.cronjb.months} ${config.cronjb.weeks}`, async function() {
        await upload();
    });
}