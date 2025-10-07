import fs, { statSync } from "node:fs";
import { env } from "#env";
import { Storage } from "megajs";
import ck from "chalk";
import { dump } from "#utils";

export async function getLoggedInStorage() {
    const email = env.MEGA_EMAIL!
    const password = env.MEGA_PASS!

    const userAgent = "Discloud"

    return new Storage({ email, password, userAgent }).ready
}

export async function megaUpload() {
    const filepath = await dump();
    const fstream = fs.createReadStream(`./${filepath}`);
    const { size } = statSync(filepath);

    try {
        const storage = await getLoggedInStorage();

        const file = await storage.upload({
            name: `${env.DRIVEPATH.endsWith("/") ? env.DRIVEPATH.slice(0, -1) : env.DRIVEPATH}/${filepath}`,
            size: size,
        }, fstream as never).complete;

        console.log(ck.blueBright(`${file.name} has been uploaded.`));
        await storage.close();
    } catch (error) {
        console.error(ck.redBright("An error occurred during Mega upload:" ));
        console.error(ck.red(error));
    }
}
