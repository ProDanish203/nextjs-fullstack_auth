import { connectDb } from "@/lib/config/db";
import { extractFromToken } from "@/lib/helpers/extractFromToken";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    try{
        await connectDb();
        const userId = await extractFromToken(req)
        const user = await User.findById(userId).select("-password");
               
        return NextResponse.json({
            message: "User found",
            success: true,
            data: user
        })
    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}