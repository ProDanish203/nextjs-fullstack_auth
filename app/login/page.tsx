"use client"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { sendMail } from "@/lib/helpers/mailer"
import Link from "next/link"


const LoginPage = () => {

  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  const handleLogin = async (e:FormEvent) => {
    e.preventDefault();
    if(!user.username) return toast.error("Username is required")
    if(!user.password) return toast.error("Password is required")

    try{
      setLoading(true);
      const {data} = await axios.post("/api/users/login", user)
      if(!data.success) return toast.error("Invalid Credentials");
      toast.success("Login success");
      router.push(`/profile/${data.data._id}`);

    }catch(error:any){
      console.log(error)
      toast.error(error.response.data.error)
    }finally{
      setLoading(false);
    }
  }

  return (
    <section>
      <h2 className="text-center text-4xl font-semibold">Login</h2>
      <form onSubmit={handleLogin} className="max-w-[500px] flex flex-col gap-5 w-full mx-auto border-2 rounded-lg py-5 px-4 mt-10">
        <div className="flex flex-col gap-3 max-w-[400px] w-full mx-auto">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" id="username" required autoComplete="off" name="username"
          value={user.username} onChange={handleChange}
          className="border-b-2 border-b-neutral-400 outline-none"
          />
        </div>

        <div className="flex flex-col gap-3 max-w-[400px] w-full mx-auto">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" required autoComplete="off" name="password"
          value={user.password} onChange={handleChange}
          className="border-b-2 border-b-neutral-400 outline-none"
          />
        </div>

        <button type="submit" disabled={loading} className="rounded-full bg-black text-white w-fit px-8 py-2 mx-auto">
          {loading ? "Logging in...": "Login"}
        </button>

        <Link href="/forgotPass" className="text-left align-start underline">Forgot Password?</Link>
      </form>
    </section>
  )
}

export default LoginPage