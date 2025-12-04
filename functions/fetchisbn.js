import fetch from "node-fetch";

export async function handler(event, context) {
    const code = event.queryStringParameters.code;
    if (!code)
        return { statusCode: 400, body: "Fehlende ISBN" };

    const url = `https://www.isbn.de/buch/${code}`;

    try {
        const response = await fetch(url);
        const html = await response.text();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: html
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: "Fehler: " + err.message
        };
    }
}
