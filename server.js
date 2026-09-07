const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    if (req.url === "/") {

        fs.readFile("./public/index.html", (err, data) => {

            if (err) {
                res.writeHead(500);
                res.end("Error al leer el archivo");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

    } else {
        res.writeHead(404);
        res.end("Página no encontrada");
    }

});

server.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000");
});
