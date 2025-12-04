import fetch from "node-fetch";

export async function handler(event, context) {
    const code = event.queryStringParameters.code;
    if (!code) return { statusCode: 400, body: "Missing ISBN" };

    const url = `https://www.isbn.de/buch/${code}`;

    try {
        const response = await fetch(url);
        const html = await response.text();

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: html
        };

    } catch (e) {
        return { statusCode: 500, body: "Error: " + e.message };
    }
}
