import { env } from "#env";
import { MutableFile, Storage } from "megajs";
import { createReadStream } from "fs";
import ck from "chalk";

export async function getLoggedInStorage () {
  const email = env.MEGA_EMAIL || ""
  const password = env.MEGA_PASSWORD || ""

  const userAgent = "Discloud"

  return new Storage({ email, password, userAgent }).ready
}

export async function megaUpload() {
    const storage = await getLoggedInStorage();
    const fstream = createReadStream(env.FILEPATH, {
        highWaterMark: env.CHUNK_SIZE
    });
    
    fstream.on("readable", async function() {
        let chunk: string | Buffer<ArrayBufferLike>;
        let file: MutableFile | undefined = undefined;
        let isFirstTime = true;
        while (null !== (chunk = fstream.read())) {
            if (!file) {
                file = await storage.upload({ name: env.DRIVEPATH }, chunk).complete;
                isFirstTime = false;
                continue;
            }
            file = file.upload({ name: env.DRIVEPATH }, chunk);
        }
        console.log(ck.blueBright(`${env.DRIVEPATH} has been uploaded.`));
    })

    console.log("Upload concluído com sucesso!");
}
