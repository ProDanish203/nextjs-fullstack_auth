import { connectDb } from "@/lib/config/db";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req:NextRequest) => {
    try{
        await connectDb()
        const {token} = await req.json();

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })

        if(!user) return NextResponse.json({error: "Invalid Token"}, {status: 500})

        user.emailVerified = true;
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save();

        return NextResponse.json({
            message: "Email verified",
            success: true,
        })
    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})

    }
}