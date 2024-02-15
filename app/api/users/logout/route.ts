import { connectDb } from "@/lib/config/db";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (req:NextRequest) => {
    try{
        const response = NextResponse.json({
            message: "Logged out successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;
    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}