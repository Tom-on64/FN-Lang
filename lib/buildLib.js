import { compile } from "../src/Compiler.ts";

const files = [ "bool", "pair", "natural", "int", "io" ];

const stdlib = {};

files.forEach(f => {
    const lib = Deno.readTextFileSync(`./lib/${f}.fn`);
    stdlib[f] = compile(lib);
})

Deno.writeTextFileSync("./src/stdlib.json", JSON.stringify(stdlib));
