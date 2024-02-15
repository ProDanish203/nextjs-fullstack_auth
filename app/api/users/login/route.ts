import { connectDb } from "@/lib/config/db";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import JWT from "jsonwebtoken"

export const POST = async (req:NextRequest) => {
    try{
        await connectDb();
        const { username, password } = await req.json();

        if(!username) return NextResponse.json({error: "Username is required"}, {status: 500}) 
        if(!password) return NextResponse.json({error: "Password is required"}, {status: 500}) 

        const user = await User.findOne({username});
        if(!user) return NextResponse.json({error: "Invalid Credentials"}, {status: 500})

        const comparePass = await bcryptjs.compare(password, user.password);
        if(!comparePass) return NextResponse.json({error: "Invalid Credentials"}, {status: 500})

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await JWT.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        })

        const response = NextResponse.json({
            message: "Login success",
            success: true,
            data: user
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}