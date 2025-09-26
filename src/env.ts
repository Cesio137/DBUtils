import { validateEnv } from "#helpers";
import { z } from "zod";

function validateSchema() {
    const envSchema = validateEnv(z.object({
        MIGRATE_TO: z.enum(["mongodb", "discloud"]),
        MONGO_URI: z.string("MongOdb connection uri is required").min(1),
        DBNAME: z.string("Database name is required"),
        OUT: z.string("Output file name is required").min(1),
    }));

    return envSchema;
}

export const env = validateSchema();