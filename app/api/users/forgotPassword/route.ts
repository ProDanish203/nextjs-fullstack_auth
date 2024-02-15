import { connectDb } from "@/lib/config/db";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (req:NextRequest) => {
    try{
        await connectDb()
        const {token, newPassword} = await req.json();

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: {$gt: Date.now()}
        })

        if(!user) return NextResponse.json({error: "Invalid Token"}, {status: 500})

        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(newPassword, salt)
        if(!hashedPass) return NextResponse.json({error: "Error while hashing password"}, {status: 500})


        user.password = hashedPass;
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save();

        return NextResponse.json({
            message: "Password Updated",
            success: true,
        })
    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})

    }
}