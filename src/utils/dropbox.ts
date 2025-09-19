import { Dropbox } from 'dropbox';
import fs from "node:fs";
import ck from "chalk";
import { env } from '#env';

const dropbox = new Dropbox({ accessToken: env.DROPBOX_TOKEN });

export async function dbxUpload() {
    let hasError = false;
    const fstream = fs.createReadStream(`${env.FILEPATH}`, { highWaterMark: env.CHUNK_SIZE });
    fstream.on("readable", async function() {
        let sessionId: string = "";
        let offset = 0;
        
        let chunk: string | Buffer<ArrayBufferLike>;
        while (null !== (chunk = fstream.read())) {
            if (sessionId === "") {
                await dropbox.filesUploadSessionStart({
                    close: false,
                    contents: chunk
                }).then(function(res) {
                    sessionId = res.result.session_id;
                }).catch(function(reason) {
                    fstream.close(function (error) {
                        const code = typeof error?.code === "undefined" ? 0 : error.code;
                        const message = typeof error?.message === "undefined" ? "Failed to close file." : error.message;
                        console.log(ck.red(`Error code: ${code}\n${message}`))
                    });
                    hasError = true;
                    console.log(ck.redBright(reason));
                });
            } else {
                await dropbox.filesUploadSessionAppendV2({
                    cursor: { session_id: sessionId, offset },
                    close: false,
                    contents: chunk
                }).catch(function(reason) {
                    fstream.close(function (error) {
                        const code = typeof error?.code === "undefined" ? 0 : error.code;
                        const message = typeof error?.message === "undefined" ? "Failed to close file." : error.message;
                        console.log(ck.red(`Error code: ${code}\n${message}`))
                    });
                    hasError = true;
                    console.log(ck.redBright(reason));
                });
            }
            if (hasError) return;
            offset += chunk.length;
        }

        await dropbox.filesUploadSessionFinish({
            cursor: { session_id: sessionId, offset },
            commit: {
                path: `${env.DRIVEPATH}`,
                mode: { ".tag": "add" },
                autorename: true,
                mute: false
            }
        }).then(function() {
            console.log(ck.blueBright(`${env.DRIVEPATH} has been uploaded.`));
        }).catch(function(reason) {
            hasError = true;
            console.log(ck.redBright(reason));
        });
    });
}