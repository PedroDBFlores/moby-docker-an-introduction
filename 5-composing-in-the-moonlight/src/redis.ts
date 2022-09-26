import { connect, Redis } from "https://deno.land/x/redis@v0.27.0/mod.ts";

interface RedisInfo {
    hostname: string
    port: number
}
const fetchRedisInfo = (): RedisInfo => ({
    hostname: Deno.env.get("REDIS_HOSTNAME") ?? "localhost" as string,
    port: Number.parseInt(Deno.env.get("REDIS_PORT") ?? "6379"),
})

const initializeRedis = async (): Promise<Redis> => {
    const redisInfo = fetchRedisInfo()
    return await connect(redisInfo)
}

export default initializeRedis;