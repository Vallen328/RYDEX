import mongoose, { Document } from "mongoose";

interface IUser extends Document{      //Just making the type of schema
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {             //No required cuz of Google Auth
        type: String
    }
}, {timestamps: true})

//Now, node.js se backend bana rahe hote and not using Next.js with Js, so writing mongoose.model("User", userSchema) was enough but we are using Next.Js. Next.js toh aisa hai nahi ki humne server banaya hai and usko start kiya hai and jab hum usko band kardenge toh server band hojaye. Aisa Toh hai nahi. Next.js mein toh humara basically hota yeh hai ki Next.Js mein jabhi hum koi API ko call karte hai toh woh API call hoti hai woho humara person joh hai joh humara next.js ko banaya hai woh khudh APIs ko handle karta hai. Next.Js runs on edges pe run hota hai means ek server ka maanlo Mumbai mein rakha hai or second one kept at Kolkata, etc. Not like Only one server dependent. API can go to any edge. Toh ab yahan pe jabhi API humari kisi bhi server pe jaa sakti hai maanloek baar API gayi Mumbai so API gave the info whatver we needed from Mumbai server which takes info from MongoDB. But Now after sending the data, connection between user and server breaks. When second API is called, so as our connection is broken down, so when it calls, possiblity is It can go to Kolkata server and we need t again connected our MongoDB. So again model will be created which is not correct. So in mongoose, when model is created, internally it created array of models so if a model has been created so we no need of new model so we do is write mongoose.models.User 
const User =  mongoose.models.User || mongoose.model("User", userSchema)

export default User