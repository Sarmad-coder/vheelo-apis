import { Server as HTTPServer } from "http";
import { Server, } from "socket.io";

import main from "./sockets/"

export default async function socket(server: HTTPServer) {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });
    main(io);
}

