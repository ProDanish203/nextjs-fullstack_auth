"use client"
import axios from "axios";
import { useEffect } from "react";

const ProfilePage = ({params}: {params: {id: string}}) => {
  const {id} = params;

  const getUser = async () => {
    const {data} = await axios.get("/api/users/currentUser");
  }

  // useEffect(() => {
  //   getUser();
  // }, [])

  return (
    <div>
      {/* {data.data} */}
      
    </div>
  )
}

export default ProfilePage;