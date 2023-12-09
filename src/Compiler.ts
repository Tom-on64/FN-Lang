import { Lexer } from "./Lexer.ts";
import { Parser } from "./Parser.ts";
import { Generator } from "./Generator.ts";

export const compile = (code: string): string => {
    const lexer = new Lexer(code);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parseProgram();
    const generator = new Generator();
    const out = generator.generate(ast);
    // console.log(out);
    return out;
}
