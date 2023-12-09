import { IToken, TokenType } from "./Lexer.ts";

export class Parser {
    tokens: IToken[];
    index: number;
    constructor(tokens: IToken[]) {
        this.index = 0;
        this.tokens = tokens;
    }

    parseBody(prevCall?: INodeFunctionCall): INodeBody {        
        let calledFunc: INodeBody | string;
        if (this.current().type === TokenType.IDENTIFIER && this.peek().type !== TokenType.PARENOPEN && !prevCall) {
            const identifier = this.tryConsume(TokenType.IDENTIFIER);
            if (!identifier.value) return Deno.exit(1);
            if (this.current().type !== TokenType.COLON) return { identifier: identifier.value, type: "functionIdent" };
            this.tryConsume(TokenType.COLON);
            return { argIdent: identifier.value, body: this.parseBody(), type: "function" };
        } else if (this.current().type === TokenType.IDENTIFIER && !prevCall) {
            const identifier = this.tryConsume(TokenType.IDENTIFIER);
            if (!identifier.value) return Deno.exit(1);
            calledFunc = identifier.value;
        } else if (!prevCall) calledFunc = this.parseBody();
        else calledFunc = prevCall;

        this.tryConsume(TokenType.PARENOPEN);
        const arg = this.parseBody();
        this.tryConsume(TokenType.PARENCLOSE);

        if (this.current().type === TokenType.PARENOPEN) calledFunc = this.parseBody({ func: calledFunc, arg, type: "functionCall" });

        if (!prevCall && typeof(calledFunc) !== "string" && calledFunc.type === "functionCall") return calledFunc;
        return { func: calledFunc, arg, type: "functionCall" };
    }

    parseDeclaration(): INodeDeclaration {
        this.tryConsume(TokenType.SQOPEN);
        const ident = this.tryConsume(TokenType.IDENTIFIER);
        if (!ident.value) return Deno.exit(1);
        this.tryConsume(TokenType.SQCLOSE);

        const body = this.parseBody();

        return { indentifier: ident.value, body, type: "declaration" };
    }

    parseImport(): INodeImport {
        this.tryConsume(TokenType.AT);
        const ident = this.tryConsume(TokenType.IDENTIFIER);
        if (!ident.value) return Deno.exit(1);
        
        return { value: ident.value, type: "import" };
    }

    parseProgram(): INodeProgram {
        const program: INodeProgram = { body: [], type: "program" };

        while (this.index < this.tokens.length) {
            if (this.current().type === TokenType.SQOPEN) program.body.push(this.parseDeclaration());
            else if (this.current().type === TokenType.AT) program.body.push(this.parseImport());
            else if (this.current().type === TokenType.RAW) program.body.push({ code: this.consume().value as string, type: "raw" });
            else console.error(`Error: unexpected ${this.consume().type} token!`);
        }

        return program;
    }

    private current(): IToken {
        if (this.index >= this.tokens.length) return { type: TokenType.NULL };
        return this.tokens[this.index];
    }

    private tryConsume(expected: TokenType): IToken {
        if (this.current().type !== expected) 
            console.error(`Error: Expected ${expected} token, but got ${this.current().type}.`);
        this.index++;
        return this.tokens[this.index - 1];
    }

    private consume(): IToken {
        this.index++;
        return this.tokens[this.index-1];
    }

    private peek(amount = 1): IToken {
        if (this.index + amount >= this.tokens.length) console.error("Error: Peak out of range!");
        return this.tokens[this.index+amount];
    }
}

/* --- Nodes --- */

interface INodeImport {
    value: string;
    type: "import";
}

export interface INodeFunction {
    argIdent: string;
    body: INodeBody;
    type: "function";
}

export interface INodeFunctionCall {
    func: INodeBody | string;
    arg: INodeBody;
    type: "functionCall";
}

export interface INodeFunctionIdent {
    identifier: string;
    type: "functionIdent";
}

export type INodeBody = INodeFunction | INodeFunctionCall | INodeFunctionIdent;

export interface INodeDeclaration {
    indentifier: string;
    body: INodeBody;
    type: "declaration";
}

interface INodeRaw {
    code: string;
    type: "raw";
}

export interface INodeProgram {
    body: (INodeDeclaration | INodeImport | INodeRaw)[];
    type: "program";
}
