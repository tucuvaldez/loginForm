import minimist from "minimist";

const args = minimist(process.argv.slice(2), {
  alias: { m: "mode", p: "port" },
  default: { m: "FORK", p: "8080" },
});
export const minimistconfig = { port: args.port, mode: args.m };
