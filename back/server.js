import http from "http";
import app from "./API/app.js";
import dotenv from "dotenv";
dotenv.config()

const server = http.createServer(app);

const port = process.PORT || 3000;

server.on('listening', function(){
    console.log(`listening on http://localhost:${port}`);
})

server.listen(port);



