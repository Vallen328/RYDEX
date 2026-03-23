import mongoose from "mongoose"

const mongodbUrl = process.env.MONGODB_URL

if(!mongodbUrl){
    throw new Error("Db URL not found!")
}



let cached = global.mongooseConn  //As mongooseConn is defined by us, so we need to declare its type
// So basically, if connection is complete, we will keep in conn and if it's in the pending state, we will keep in promise.

if(!cached){
    cached = global.mongooseConn = {conn: null, promise: null}
}

const connectDB = async() => {
    if(cached.conn){
        return cached.conn
    }

    //Suppose both are null, so at that time, we need to connect our mongoDB.
    if(!cached.promise){    //We will take promise of connect and later it will be resolved.
        cached.promise = mongoose.connect(mongodbUrl).then(c => c.connection)
    }
    
    //When u try to resolve a promise, you always write try-catch block
    try{
        const conn = await cached.promise
        return conn
    }catch(error){
        console.log(error)
    }
}

export default connectDB