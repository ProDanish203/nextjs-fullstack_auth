"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const VerifyEmailPage = ({searchParams}:any) => {
    const {token} = searchParams
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    if(!token) router.push("/login");

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        if(!password) return toast.error("Password is required");
        if(password.includes(" ")) return toast.error("Password must not contain any white spaces");
        try{
            setLoading(true)
            const {data} = await axios.post('/api/users/forgotPassword', {
                token,
                newPassword: password
            })
            console.log(data)
            if(data.success){
                toast.success("Password updated");
                router.push("/login");
            }
        }catch(error){
            toast.error("Something went wrong")
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return (
    <main className="flex items-center justify-center">

        <form onSubmit={handleSubmit} className="max-w-[400px] flex flex-col gap-5 w-full mx-auto border-2 rounded-lg py-5 px-4 mt-10">
            <h2 className="text-3xl mb-5 font-semibold text-center">Change Password!!!</h2> 
            <div className="flex flex-col gap-3 max-w-[400px] w-full mx-auto">
                <label htmlFor="password">New Password</label>
                <input type="password" placeholder="New Password" id="password" required autoComplete="off" name="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="border-b-2 border-b-neutral-400 outline-none"
                />
            </div>

            <button className="text-white bg-black rounded-full mx-auto px-5 py-2">Reset Password</button>
        </form>
    </main>
    )
}

export default VerifyEmailPage;