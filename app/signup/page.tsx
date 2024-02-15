"use client"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

const SignupPage = () => {

  const router = useRouter(); 
  const [user, setUser] = useState({
    username: "",
    email: "",
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

  const handleSignup = async (e:FormEvent) => {
    e.preventDefault();
    if(!user.username) return toast.error("Username is required")
    if(!user.email) return toast.error("Email is required")
    if(!user.password) return toast.error("Password is required")
    if(user.password.includes(" ")) return toast.error("Password must not contain any white spaces")

    try{
      setLoading(true);
      const {data} = await axios.post("/api/users/signup", user)

      if(!data.success) return toast.error("Something went wrong");
      toast.success("Signup success");
      toast.info("A verification email has been sent to you. Please verify your account")
      router.push("/login");
    }catch(error:any){
      toast.error(error.response.data.error)
    }finally{
      setLoading(false);
    }
  }

  return (
    <section>
      <h2 className="text-center text-4xl font-semibold">Signup</h2>
      <form onSubmit={handleSignup} className="max-w-[500px] flex flex-col gap-5 w-full mx-auto border-2 rounded-lg py-5 px-4 mt-10">
        <div className="flex flex-col gap-3 max-w-[400px] w-full mx-auto">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" id="username" required autoComplete="off" name="username"
          value={user.username} onChange={handleChange}
          className="border-b-2 border-b-neutral-400 outline-none"
          />
        </div>

        <div className="flex flex-col gap-3 max-w-[400px] w-full mx-auto">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" id="email" required autoComplete="off" name="email"
          value={user.email} onChange={handleChange}
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
          {loading ? "Signing up...": "Sign up"}
        </button>
      </form>
    </section>
  )
}

export default SignupPage