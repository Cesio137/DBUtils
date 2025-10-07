import ck from "chalk";
import { exec } from "node:child_process";


export async function runCommand(command: string): Promise<void> {
    console.log(ck.blue(`Executing command: ${command}`));

    return new Promise(function (resolve, reject) {
        const child = exec(command, function (error, stdout, stderr) {
            if (error) {
                console.log(ck.red(`ERRO: ${error.message}`));
                console.log(ck.red(`stderr: ${stderr}`));
                return reject(error);
            }

            console.log(ck.blue(`stderr: ${stdout}`));
            resolve();
        });

        child.stdout?.on('data', function(data) {
            process.stdout.write(ck.blue(data));
        });
        child.stderr?.on('data', function(data) {
            process.stderr.write(ck.red(data));
        });
    });
}