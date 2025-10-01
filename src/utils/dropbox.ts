import fetch from "node-fetch";
import { Dropbox } from 'dropbox';
import ck from "chalk";
import { env } from '#env';
import { user } from '#tools';

const dropbox = new Dropbox({ accessToken: env.DROPBOX_TOKEN });

export async function dbxUpload() {
    const app = await user.apps.fetch(env.APPID);
    const backup = await app.backup();
    const url = backup.url;

    const response = await fetch(url);
    if (!response.ok || !response.body) {
        console.log(ck.red("Failed to download file from discloud"));
        return;
    }
    const stream = response.body;

    try {
        let sessionId: string | undefined;
        let offset = 0;
        for await (const chunk of stream) {
            if (!sessionId) {
                const response = await dropbox.filesUploadSessionStart({
                    close: false,
                    contents: chunk
                });
                sessionId = response.result.session_id;
            } else {
                await dropbox.filesUploadSessionAppendV2({
                    cursor: { session_id: sessionId, offset },
                    close: false,
                    contents: chunk
                });
            }
            offset += chunk.length;
        }

        if (!sessionId) {
            console.log(ck.yellow("File is empty, nothing to upload."));
            return;
        }

        await dropbox.filesUploadSessionFinish({
            cursor: { session_id: sessionId, offset: offset },
            commit: {
                path: env.DRIVEPATH || `/${app.name}.zip`,
                mode: { ".tag": "add" },
                autorename: true,
                mute: false
            }
        });

        console.log(ck.blueBright(`${env.DRIVEPATH} has been uploaded.`));
    } catch (error) {
        console.error(ck.redBright("An error occurred during Dropbox upload: "));
        console.error(ck.red(error));
    }
}