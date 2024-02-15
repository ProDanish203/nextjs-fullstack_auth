import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const extractFromToken = (req: NextRequest) => {
    try{
        const token = req.cookies.get('token')?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
        // @ts-ignore
        return decodedToken.id;
    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}