import { validateEnv } from "#helpers";
import ck from "chalk";
import { z } from "zod";

function validateSchema() {
    const envSchema = validateEnv(z.object({
        TASK: z.enum(["import", "export"]),
        // MONGODB
        MONGO_DB_NAME: z.string().optional(),
        MONGO_COLLECTION_NAME: z.string().optional(),
        MONGO_LOCALHOST_URI: z.string("MongOdb connection uri is required").min(1),
        ATLAS_URI: z.string("MongOdb connection uri is required").min(1),
        MONGO_OUT_DIR: z.string("Output file name is required").min(1),
    }));

    if (typeof envSchema.COLLECTION_NAME == "string" && typeof envSchema.DB_NAME == "undefined") {
        console.log(ck.red("Env var DB_NAME must be set if COLLECTION_NAME has been set"));
        process.exit(-1);
    }

    return envSchema;
}

export const env = validateSchema();