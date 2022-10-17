import { Redis } from "https://deno.land/x/redis@v0.27.0/mod.ts";

const serveHttp = async (conn: Deno.Conn, redis: Redis) => {
    const httpConnection = Deno.serveHttp(conn);
    for await (const req of httpConnection) {
        handleRequest(req, redis);
    }
}

const readBody = async <T>(req: Deno.RequestEvent): Promise<T | null> => {
    const reader = req.request.body?.getReader()
    const data = await reader?.read();
    if (!data?.value) {
        return null
    } else {
        const decoded = new TextDecoder().decode(data?.value)
        return JSON.parse(decoded) as T
    }
}

const getQueryParam = (req: Deno.RequestEvent, key: string): string | null =>
    new URL(req.request.url).searchParams.get(key)

const handleRequest = async (req: Deno.RequestEvent, redis: Redis) => {
    switch (req.request.method) {
        case "GET":
            {
                const key = getQueryParam(req, "key")
                if (!key) {
                    await req.respondWith(new Response("No query param key provided ", { status: 400 }))
                    break;
                }
                const data = await redis.get(key!);
                if (data) {
                    await req.respondWith(new Response(data, { status: 200 }));
                } else {
                    await req.respondWith(new Response("Key not found", { status: 404 }))
                }
                break;
            }
        case "POST":
            {
                const body = await readBody<PostBody>(req)
                if (!body) {
                    await req.respondWith(new Response("No body provided", { status: 400 }))
                    break;
                }
                const ok = await redis.set(body!.key, body!.value)
                await req.respondWith(new Response(ok, { status: 201 }))
                break;
            }
        case "DELETE":
            {
                const key = getQueryParam(req, "key")
                if (!key) {
                    await req.respondWith(new Response("No query param key provided ", { status: 400 }))
                    break;
                }
                await redis.del(key)
                await req.respondWith(new Response(null, { status: 204 }))
                break;
            }
        default:
            break;
    }
}

interface PostBody {
    key: string,
    value: string
}

const initializeServer = async (port: number, redis: Redis) => {
    const hostname = "0.0.0.0";
    const listener = Deno.listen({
        hostname,
        port
    });
    console.log(`Listening on ${hostname}:${port}`);

    for await (const conn of listener) {
        serveHttp(conn, redis);
    }
}

export default initializeServer;