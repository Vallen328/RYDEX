import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { sendMail } from "@/lib/sendMail";

export async function POST(req: NextRequest){
    try{
        const {name, email, password} = await req.json()

        if(!name || !email || !password){
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            )
        }
        
        await connectDB()
        let user = await User.findOne({email})
        if(user && user.isEmailVerified){
            return NextResponse.json(
                { message: "Email already exist!" },
                {status: 400}
            )
        }
        //If we want a 6 digit OTP, then if u see in 9 lakhs, we have 5 Zeroes so in that 9 lakh, we randomly take out numbers so that will be also with 5 digit Zeroes. So later on we add 1 lakh.
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000) //10 minutes


        if(password.length < 6){
            return NextResponse.json(
                { message: "Password must be at least 6 characters" },
                {status: 400}
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        if(user && !user.isEmailVerified){
            user.name=name,
            user.password = hashedPassword,
            user.email = email,
            user.otp = otp,
            user.otpExpiresAt = otpExpiresAt
            await user.save()
        }else{
            user = await User.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiresAt
            })
        }

        await sendMail(
            email,
            "Your OTP for Email Verification",
            `<h2> Your Email Verification OTP is <strong>${otp}</strong>. It will expire in 10 minutes. </h2>`
        )

        

        return NextResponse.json(
                user,
                { status: 201 }
            )
    }catch(error){
        return NextResponse.json(
                { message: `register error ${error}` },
                { status: 500 }
            )
    }
}