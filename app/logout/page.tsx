"use client";

import AlertMessage from "@/components/alertMessage/AlertMessage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { POST } from "../api/blogs/route";

function Logout() {
  const router = useRouter();
  const logoutMe = async () => {
    try {
      const resp = await fetch("/api/logout", {
        method: "POST",
        cache: "no-cache",
        mode: "no-cors",
      });
      if(resp.status==200){
        router.push('/login')
      }
    } catch (e: any) {}
  };

  return (
    <>
      <div className="logoutSection">
        <button className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={logoutMe}>Logout</button>
      </div>
    </>
  );
}

export default Logout;
