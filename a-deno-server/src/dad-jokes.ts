const endpoint = "https://icanhazdadjoke.com"

interface Joke {
    id: string;
    joke: string;
    status: number;
}

const fetchJoke = (): Promise<Joke> => fetch(endpoint, {
    headers: {
        "Accept": "application/json"
    }
})
    .then(res => res.json())
    .then(json => json as Joke)


export default fetchJoke;