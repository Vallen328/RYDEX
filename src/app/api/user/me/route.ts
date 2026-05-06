import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/models/user.model";

export async function GET(request: Request){
    try{
        await connectDB()
        //Agar authenticated hai user, tabhi user ka data find hoke mile.
        //So how we will find current user ka data? 
        // So for that remember we had stored token in cookies, so we will get that token from cookies, and then we will verify that token, and then we will find the user with the help of that token.
        //Also, next-auth ke paas whatever token we have, next-auth handles itself and from next-auth we get auth function. If from frontend, you want to access session, we use useSession but suppose if we want to access it from backend, then inside auth.ts, we were exporting auth if u remember? So this auth ko use karke, we will get session for backend. So finally we will get the current userID joh bhi authenticated hoga. If ID not getting, so user is not authenticared.
        const session = await auth()
        if(!session || !session.user){
            return Response.json(
                {message: "User is not authenticated!"},
                {status: 400}
            )
        }
        const user = await User.findOne({email:session.user.email})
        if(!user){
            return Response.json(
                {message: "User not found!"},
                {status: 400}
            )
        } 
        return Response.json(
            user,
            {status: 200}
        )
    }catch(error){
        return Response.json(
            {message: `Get me Error ${error}`},
            {status: 500}
        )
    }
}