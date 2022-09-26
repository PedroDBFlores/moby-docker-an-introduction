import initializeRedis from "./redis.ts";
import initializeServer from "./server.ts";

const port = Deno.args[0] ?? Deno.env.get("PORT");
const redis = await initializeRedis()
await initializeServer(Number.parseInt(port), redis)




