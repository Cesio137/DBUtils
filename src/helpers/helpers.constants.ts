/*
import configJson from "../../config.json" with { type: "json" };

declare global {
    const config: typeof configJson;
}

Object.assign(globalThis, Object.freeze({
    credentials: configJson
}));

export const config = Object.assign({}, Object.freeze(configJson));
*/