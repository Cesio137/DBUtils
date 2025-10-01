import { validateEnv } from "#helpers";
import ck from "chalk";
import { z } from "zod";

function validateSchema() {
    const envSchema = validateEnv(z.object({
        PLATFORM: z.enum(["dropbox", "mega"]),
        SCHEDULE: z.string(`Expected ${ck.underline("* * * * * *")}`).min(11),
        DISCLOUD_TOKEN: z.string("Expected discloud api token").min(1),
        APPID: z.string("Expected app id").min(1),
        DRIVEPATH: z.string().optional(),
        //CHUNK_SIZE: z.string("Expected chunk size in bytes").min(1).transform(Number),
        DROPBOX_TOKEN: z.string().optional(),
        MEGA_EMAIL: z.string().optional(),
        MEGA_PASS: z.string().optional(),
    }));

    if (envSchema.PLATFORM === "dropbox" && typeof envSchema.DROPBOX_TOKEN === "undefined") {
        console.error("Expected dropbox token");
        process.exit(-1);
    } else if (envSchema.PLATFORM === "mega" && (typeof envSchema.MEGA_EMAIL === "undefined" || typeof envSchema.MEGA_PASS === "undefined")) {
        console.error("Expected mega credentials");
        process.exit(-1);
    }

    return envSchema;
}

export const env = validateSchema();