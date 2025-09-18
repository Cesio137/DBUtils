import ck from "chalk";
import { z, ZodObject, ZodRawShape } from "zod";

export function validateEnv<T extends ZodRawShape>(schema: ZodObject<T>) {
    const result = schema.loose().safeParse(process.env);
    if (!result.success) {
        const u = ck.underline;
        for (const error of result.error.issues) {
            const { path, message } = error;
            console.error(`ENV VAR → ${u.bold(path)} ${message}`);
            if (error.code == "invalid_type")
                console.log(ck.dim(
                    `└ "Expected: ${u.green(error.expected)} | Received: ${u.red(error.input)}`
                ));
        }
        process.exit(1);
    }
    console.log(ck.green(`${ck.magenta("☰ Environment variables")} loaded ✓`));

    return result.data as Record<string, string> & z.infer<typeof schema>;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            "Use import { env } from \"#settings\"": never
        }
    }
}