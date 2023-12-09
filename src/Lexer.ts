export interface IToken {
    type: TokenType; 
    value?: string;
}

export enum TokenType {
    IDENTIFIER = "ident", 
    SQOPEN = "[", 
    SQCLOSE = "]", 
    PARENOPEN = "(", 
    PARENCLOSE = ")", 
    COLON = ":",
    AT = "@", 
    EXCL = "!", 
    RAW = "[raw code]",  
    NULL = "NULL"
}

export class Lexer {
    index: number;
    input: string[];

    constructor(input: string) {
        this.index = 0;
        this.input = input
            .replaceAll(/\?.*/g, "")
            .split("");
    }

    tokenize(): IToken[] {
        const tokens: IToken[] = [];
        while (this.index < this.input.length) {
            if (this.current().match(/\s/)) this.consume(); 
            else if (this.current().match(/[A-Za-z0-9_]/)) {
                let identifier = "";
                while (this.current() && this.current().match(/[A-Za-z0-9_]/)) identifier += this.consume();
                tokens.push({ type: TokenType.IDENTIFIER, value: identifier });
            } else if (this.current() === "%") {
                this.consume(); 

                let content = "";
                while (this.current() !== '%') content += this.consume();
                this.consume();

                tokens.push({ type: TokenType.RAW, value: content });
            } else if (this.current() === "[") tokens.push({ type: TokenType.SQOPEN, value: this.consume() });
            else if (this.current() === "]") tokens.push({ type: TokenType.SQCLOSE, value: this.consume() });
            else if (this.current() === "(") tokens.push({ type: TokenType.PARENOPEN, value: this.consume() });
            else if (this.current() === ")") tokens.push({ type: TokenType.PARENCLOSE, value: this.consume() });
            else if (this.current() === ":") tokens.push({ type: TokenType.COLON, value: this.consume() });
            else if (this.current() === "@") tokens.push({ type: TokenType.AT, value: this.consume() });
            else if (this.current() === "!") tokens.push({ type: TokenType.EXCL, value: this.consume() });
            else console.error(`Error: Unexpected character '${this.consume()}'! Ignoring.`);
        }

        return tokens;
    }
    
    private current(): string {
        return this.input[this.index];
    }

    private consume(): string {
        this.index++;
        if (this.index > this.input.length) { console.error("Consume out of range!"); return Deno.exit(1); }
        return this.input[this.index-1];
    }
}