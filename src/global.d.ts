import { Connection } from "mongoose";

declare global{
    var mongooseConn: {    //Iss mongooseConn ke andar, we will store connection.
        conn: Connection | null,
        promise: Promise<Connection> | null      //Another thing can b promise, where we are not connected but we are going to be connected soon
    }
}

export {}