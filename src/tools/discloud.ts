import { env } from "#env";
import { discloud } from "discloud.app";

export const user = await discloud.login(env.DISCLOUD_TOKEN);