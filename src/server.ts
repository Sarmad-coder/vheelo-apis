import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import http from "http";
const server = http.createServer(app);

import socket from "./sockets"
socket(server);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})
