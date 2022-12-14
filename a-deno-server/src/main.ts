import fetchJoke from "./dad-jokes.ts";

const args = Deno.args;
const hostname = "0.0.0.0";
const port = Number.parseInt(args[0]);

Deno.addSignalListener("SIGINT", () => {
    console.log("interrupted!");
    Deno.exit();
});

const listener = Deno.listen({
    hostname,
    port
});
console.log(`Listening on ${hostname}:${port}`);

for await (const conn of listener) {
    serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
    const httpConnection = Deno.serveHttp(conn);
    for await (const req of httpConnection) {
        handleRequest(req);
    }
}

async function handleRequest(req: Deno.RequestEvent) {
    if (req.request.method == "GET") {
        const joke = await fetchJoke();
        await req.respondWith(new Response(joke.joke, { status: 200 }));
    }
}