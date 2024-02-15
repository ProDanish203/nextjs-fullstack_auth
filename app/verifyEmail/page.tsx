"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const VerifyEmailPage = ({searchParams}:any) => {
    const {token} = searchParams
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    if(!token) router.push("/login");

    const verifyUserEmail = async () => {
        try{
            setLoading(true)
            const {data} = await axios.post('/api/users/verifyEmail', {
                token
            })
            if(data.success) setVerified(true)
        }catch(error){
            toast.error("Something went wrong")
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(token.length > 0) verifyUserEmail();
    }, [token])

    return (
    <main className="flex items-center justify-center">
        {loading ? (
        <h2 className="text-4xl">
            Verifying...
        </h2>
        ) : (
        <>
        {verified ? (
        <div>
            <h2 className="text-4xl">Email verified!!!</h2> 
            <Link href="/login" className="bg-black text-white px-5 py-2 rounded-full mx-auto my-5 block text-center">Back To Login</Link>
        </div>
        ) : (
        <h2 className="text-4xl">
            Email not verified  
        </h2>
        )}
        </>
        )}

    </main>
    )
}

export default VerifyEmailPage;