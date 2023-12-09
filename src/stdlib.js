export const getPackage = (id) => {
    const lib = stdlib[id];
    if (!lib) return null;
    return lib;
};

const stdlib = {
    "natural": ""
}
