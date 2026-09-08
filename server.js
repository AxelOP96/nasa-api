const http = require("http");
const fs = require("fs");

const server = http.createServer(async (req, res) => {

    if (req.url === "/") {

        fs.readFile("./public/index.html", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error al leer index.html");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

        return;
    }

    if (req.url === "/api/apod") {

        const response = await fetch(
            "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
        );

        if (!response.ok) {
            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                error: "No se pudo obtener la información de NASA"
            }));

            return;
        }

        const data = await response.json();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(data));

        return;
    }

    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.end("Página no encontrada");
});

server.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000");
});
