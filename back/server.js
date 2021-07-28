import http from "http";
import app from "./API/app.js";
import dotenv from "dotenv";
import { path, __dirname } from "./config/pathConfig.js";
dotenv.config({ path: __dirname + '.env' })


const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.on('listening', function(){
    console.log(`listening on http://localhost:${port}`);
})

server.listen(port);



