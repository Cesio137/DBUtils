import { select } from "@inquirer/prompts";
import ck from "chalk";

export async function main() {
    const menu = await select({
        message: "Selecione uma opção",
        choices: [
            { name: "create script", value: "scripts/create" },
            { name: "quit", value: "quit" },
        ]
    });

    switch (menu) {
        case "quit":
            console.log(ck.blue("Bye!"));
            break;
        default:
            console.log(ck.blue("Bye!"));
            break;
    }
}