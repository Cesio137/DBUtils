import { validateEnv } from "#helpers";
import ck from "chalk";
import { z } from "zod";

function getEnv() {
    const envSchema = validateEnv(z.object({
        PLATFORM: z.enum(["dropbox", "mega"]),
        SCHEDULE: z.string(`Expected ${ck.underline("* * * * * *")}`).min(11),
        FILEPATH: z.string("Expected file name or path").min(1),
        DRIVEPATH: z.string("Expected file name, path").min(1),
        CHUNK_SIZE: z.string("Expected chunk size in bytes").min(1).transform(Number),
        DROPBOX_TOKEN: z.string().optional(),
    }));

    if (envSchema.PLATFORM === "dropbox" && typeof envSchema.DROPBOX_TOKEN === "undefined") {
        console.error("Expected dropbox token");
        process.exit(-1);
    }

    return envSchema;
}

export const env = getEnv();