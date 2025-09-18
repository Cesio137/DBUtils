import ck from "chalk";
import { backup } from "#utils";
import { env } from "#env";

console.log(ck.blue("💾 Database Utilities"));
await backup();