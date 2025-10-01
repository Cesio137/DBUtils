import { env } from "#env";
import { Storage } from "megajs";
import ck from "chalk";
import { user } from "#tools";
import { Readable } from "stream";

export async function getLoggedInStorage() {
    const email = env.MEGA_EMAIL!
    const password = env.MEGA_PASS!

    const userAgent = "Discloud"

    return new Storage({ email, password, userAgent }).ready
}

export async function megaUpload() {
    const app = await user.apps.fetch(env.APPID);
    const backup = await app.backup();
    const url = backup.url;

    const response = await fetch(url);
    if (!response.ok || !response.body) {
        console.log(ck.red("Failed to download file from discloud"));
        return;
    }

    // Convert webstream to node readble
    let stream: Readable;
    if (typeof response.body.getReader === "function") {
        stream = Readable.fromWeb(response.body as never);
    } else {
        stream = response.body as never;
    }

    try {
        const storage = await getLoggedInStorage();

        const file = await storage.upload({
            name: env.DRIVEPATH || `/${app.name}.zip`,
            size: parseInt(response.headers.get("content-length") || "0"),
        }, stream as never).complete;

        console.log(ck.blueBright(`${file.name} has been uploaded.`));
        await storage.close();
    } catch (error) {
        console.error(ck.redBright("An error occurred during Mega upload:" ));
        console.error(ck.red(error));
    }
}
