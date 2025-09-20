import { env } from "#env";
import { Storage } from "megajs";
import { createReadStream, statSync } from "fs";
import ck from "chalk";

export async function getLoggedInStorage() {
    const email = env.MEGA_EMAIL!
    const password = env.MEGA_PASS!

    const userAgent = "Discloud"

    return new Storage({ email, password, userAgent }).ready
}

export async function megaUpload() {
    try {
        const storage = await getLoggedInStorage();
        const { size } = statSync(env.FILEPATH);
        const fstream = createReadStream(env.FILEPATH, {
            highWaterMark: env.CHUNK_SIZE
        });

        const file = await storage.upload({
            name: env.DRIVEPATH,
            size
        }, fstream as never).complete;

        console.log(ck.blueBright(`${file.name} has been uploaded.`));
        await storage.close();
        fstream.close();
    } catch (error) {
        console.error(ck.redBright("An error occurred during Mega upload:"));
        console.error(ck.red(error));
    }
}
