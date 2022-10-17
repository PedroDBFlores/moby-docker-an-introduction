import initializeRedis from "./redis.ts";
import initializeServer from "./server.ts";

Deno.addSignalListener("SIGINT", () => {
    console.log("interrupted!");
    Deno.exit();
});

const port = Deno.args[0] ?? Deno.env.get("PORT");
const redis = await initializeRedis()
await initializeServer(Number.parseInt(port), redis)




