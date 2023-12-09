import stdlib from "./stdlib.json" assert { type: "json" };

export const getPackage = (id) => {
    let lib = stdlib[id];
    if (lib) return lib;
    try {
        lib = Deno.readTextFileSync(`${id}.fn`);
        return lib;
    } catch (err) {
        console.error(`Error: file ${id}.fn not found`);
        Deno.exit(1);
    }
};
