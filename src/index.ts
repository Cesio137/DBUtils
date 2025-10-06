import { env } from "#env";
import { atlasToDiscloud, discloudToAtlas } from "#utils";
import ck from "chalk";

console.log(ck.blue("💾 Database Utilities"));

if (env.TASK === "import") {
    await atlasToDiscloud();
} else {
    await discloudToAtlas();
}