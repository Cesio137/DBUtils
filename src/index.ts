import ck from "chalk";
import { backup } from "#utils";

console.log(ck.blue("💾 Database Utilities"));
await backup();