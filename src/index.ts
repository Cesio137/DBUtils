import { main } from "#menus";
import ck from "chalk";
import * as citty from "citty";

console.log(ck.blue("💾 Database Utilities"));

citty.runMain({
    meta: {},
    run() {
        main();
    },
});