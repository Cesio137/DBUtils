import { validateEnv } from "#helpers";
import ck from "chalk";
import { z } from "zod";

function validateSchema() {
    const envSchema = validateEnv(z.object({
        PLATFORM: z.enum(["dropbox", "mega"]),
        SCHEDULE: z.string(`Expected ${ck.underline("* * * * * *")}`).min(11),
        // Mongodb
        MONGO_DB_NAME: z.string().optional(),
        MONGO_COLLECTION_NAME: z.string().optional(),
        MONGO_LOCALHOST_URI: z.string("MongOdb connection uri is required").min(1),
        MONGO_OUT_DIR: z.string("Output file name is required").min(1),
        // Drive
        DRIVEPATH: z.string().min(1),
        //CHUNK_SIZE: z.string("Expected chunk size in bytes").min(1).transform(Number),
        // Dropbox
        DROPBOX_TOKEN: z.string().optional(),
        // Mega
        MEGA_EMAIL: z.string().optional(),
        MEGA_PASS: z.string().optional(),
    }));

    if (envSchema.PLATFORM === "dropbox" && typeof envSchema.DROPBOX_TOKEN === "undefined") {
        console.log(ck.red("Expected dropbox token"));
        process.exit(-1);
    } else if (envSchema.PLATFORM === "mega" && (typeof envSchema.MEGA_EMAIL === "undefined" || typeof envSchema.MEGA_PASS === "undefined")) {
        console.log(ck.red("Expected mega credentials"));
        process.exit(-1);
    } else if (typeof envSchema.COLLECTION_NAME == "string" && typeof envSchema.DB_NAME == "undefined") {
        console.log(ck.red("Env var DB_NAME must be set if COLLECTION_NAME has been set"));
        process.exit(-1);
    }

    return envSchema;
}

export const env = validateSchema();