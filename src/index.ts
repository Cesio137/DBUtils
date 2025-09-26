import { env } from "#env";
import { discloudToMongo, mongoToDiscloud } from "#utils";
import ck from "chalk";

console.log(ck.blue("💾 Database Utilities"));

if (env.MIGRATE_TO === "discloud") {
    await mongoToDiscloud();
} else {
    await discloudToMongo();
}