import { compile } from "./Compiler.ts";
import { run } from "./runner.js";

if (Deno.args.length < 1) { console.error("Expected file name!"); Deno.exit(1); }
const input = Deno.readTextFileSync(Deno.args[0]);

try { run(compile(input) + "\nconst exit = _main(0);console.log(`\x1b[33m[EXIT] \x1b[32m${exit?exit:0}\x1b[0m`);"); }
catch (err) { console.error(`\x1b[31mSomething Failed Horribly\x1b[0m\n${err}`); }
