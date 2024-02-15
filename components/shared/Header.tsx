"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const Header = () => {
    const router = useRouter();

    const logout = async () => {
        try{
            const {data} = await axios.get('/api/users/logout');
            if(!data.success) return toast.error("Something went wrong");
            router.push("/login");
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    }

  return (
    <header className="flex items-center justify-between py-7 px-5 max-w-[1400px] w-full mx-auto">
        <Link href="/" className="text-3xl font-semibold">
        Auth
        </Link>
        <nav className="flex items-center gap-5">
            <Link href="/login" className="text-lg font-medium">Login</Link>
            <Link href="/signup" className="text-lg font-medium">Signup</Link>
            <button onClick={logout} className="font-medium bg-black text-white rounded-full px-5 py-2">Logout</button>
        </nav>
    </header>  
  )
}
