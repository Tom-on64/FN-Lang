import { INodeBody, INodeDeclaration, INodeProgram } from "./Parser.ts";
import { getPackage } from "./stdlib.js";

export class Generator {
    output: string;
    constructor() {
        this.output = "";
    }

    genBody(body: INodeBody) {
        if (body.type === "function") {
            this.output += `${body.argIdent} => `;
            this.genBody(body.body);
        } else if (body.type === "functionCall") {
            if (typeof(body.func) === "string") this.output += `${body.func}`;
            else this.genBody(body.func);
            
            this.output += '(';
            this.genBody(body.arg);
            this.output += ')';
        } else if (body.type === "functionIdent") this.output += body.identifier;
    }
    
    genDecl(decl: INodeDeclaration) {
        this.output += `const ${decl.indentifier} = `;
        this.genBody(decl.body);
    }

    genProgram(program: INodeProgram) {
        program.body.forEach(s => {
            if (s.type === "declaration") this.genDecl(s);
            else if (s.type === "import") this.output += getPackage(s.value);
            else if (s.type === "raw") this.output += s.code;
            this.output += "\n";
        })
    }

    generate(ast: INodeProgram) {
        this.genProgram(ast);

        this.output += "\nmain(0);"

        return this.output;
    }
}