import minimist from "minimist";

const args = minimist(process.argv.slice(2));
export const minimistconfig = { port: args.port };
