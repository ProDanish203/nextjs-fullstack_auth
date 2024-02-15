"use client"
import { sendMail } from '@/lib/helpers/mailer';
import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react'
import { toast } from 'sonner';

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleReset = async (e:FormEvent) => {
        e.preventDefault();
        if(!email) return toast.error("Email is required");
        try{
            setLoading(true);
            const {data} = await axios.post('/api/users/forgotPass', {
                email
            }) 
            toast.info(data.message)
        }catch(error:any){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

  return (
    <section>
      <h2 className="text-center text-4xl font-semibold">Login</h2>
      <form onSubmit={handleReset} className="max-w-[500px] flex flex-col gap-5 w-full mx-auto border-2 rounded-lg py-5 px-4 mt-10">
        <div className="flex flex-col gap-3 max-w-[400px] w-full mx-auto">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Username" id="username" required autoComplete="off" name="username"
          value={email} onChange={(e) => setEmail(e.target.value)}
          className="border-b-2 border-b-neutral-400 outline-none"
          />
        </div>

        <button type="submit" disabled={loading} className="rounded-full bg-black text-white w-fit px-8 py-2 mx-auto">
          {loading ? "...": "Reset"}
        </button>

        <Link href="/login" className="text-left align-start underline">Back to Login</Link>
      </form>
    </section>
  )
}

export default ForgotPassword;