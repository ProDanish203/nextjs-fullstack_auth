import { connectDb } from "@/lib/config/db";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/lib/helpers/mailer";

export const POST = async (req:NextRequest) => {
    try{
        await connectDb()
        const {email} = await req.json();

        const user = await User.findOne({email})
        if(!user) return NextResponse.json({error: "Account does not exists"}, {status: 500})

        await sendMail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({
            message: "Email has been sent",
            success: true,
        })
    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})

    }
}