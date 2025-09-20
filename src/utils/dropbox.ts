import { Dropbox } from 'dropbox';
import fs from "node:fs";
import ck from "chalk";
import { env } from '#env';

const dropbox = new Dropbox({ accessToken: env.DROPBOX_TOKEN });

export async function dbxUpload() {
    const fstream = fs.createReadStream(env.FILEPATH, { highWaterMark: env.CHUNK_SIZE });

    try {
        let sessionId: string | undefined;
        let offset = 0;
        let chunkData: string | Buffer<ArrayBufferLike>;
        for await (const chunk of fstream) {
            chunkData = chunk;
            if (!sessionId) {
                const response = await dropbox.filesUploadSessionStart({
                    close: false,
                    contents: chunkData
                });
                sessionId = response.result.session_id;
            } else {
                await dropbox.filesUploadSessionAppendV2({
                    cursor: { session_id: sessionId, offset },
                    close: false,
                    contents: chunkData
                });
            }
            offset += chunkData.length;
        }

        if (!sessionId) {
            console.log(ck.yellow("File is empty, nothing to upload."));
            return;
        }

        await dropbox.filesUploadSessionFinish({
            cursor: { session_id: sessionId, offset: offset },
            commit: {
                path: env.DRIVEPATH,
                mode: { ".tag": "add" },
                autorename: true,
                mute: false
            }
        });

        console.log(ck.blueBright(`${env.DRIVEPATH} has been uploaded.`));
        fstream.close();
    } catch (error) {
        console.error(ck.redBright("An error occurred during Dropbox upload:"));
        console.error(ck.red(error));
    }
}