import { Generator } from "./Generator.ts";
import { Lexer } from "./Lexer.ts";
import { Parser } from "./Parser.ts";
import { run } from "./runner.js";

if (Deno.args.length < 1) { console.error("Expected file name!"); Deno.exit(1); }
const input = Deno.readTextFileSync(Deno.args[0]);

const lexer = new Lexer(input);
const tokens = lexer.tokenize();
const parser = new Parser(tokens);
const ast = parser.parseProgram();
const generator = new Generator();
const out = generator.generate(ast);
// console.log(JSON.stringify(ast, null, 2))
console.log(out);
run(out);
