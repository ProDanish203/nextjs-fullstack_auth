import { connectDb } from "@/lib/config/db";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendMail } from "@/lib/helpers/mailer";

export const POST = async (req:NextRequest) => {
    try{
        await connectDb();
        const { username, email, password } = await req.json();

        if(!username) return NextResponse.json({error: "Username is required"}, {status: 500}) 
        if(!email) return NextResponse.json({error: "Email is required"}, {status: 500}) 
        if(!password) return NextResponse.json({error: "Password is required"}, {status: 500}) 

        // Check if user already exists
        const userExists = await User.findOne({
            $or: [{username}, {email}]
        })

        if (userExists) {
            if (userExists.username === username) {
                return NextResponse.json({error: "Username already exists"}, {status: 500}) 
            } else {
                return NextResponse.json({error: "Email already exists"}, {status: 500}) 
            }
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt)

        const user = await User.create({
            username, 
            email,
            password: hashedPass
        })

        await sendMail({email, emailType: "VERIFY", userId: user._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user
        })

    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}