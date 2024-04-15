'use client'

import AlertMessage from "@/components/alertMessage/AlertMessage"
import { useState } from "react"
import { useRouter } from 'next/navigation'

function Login(){
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [alert, showAlert] = useState(false)
    const router = useRouter();
    
    async function handleSubmit(){
        if(username==='' || password ===''){
            setType('error')
            setMessage('Please fill all fields')
            showAlert(true)
            return
        }
        const formData = new FormData()
        formData.append('username',username)
        formData.append('password', password)
        let resp = await fetch('api/login',{
            method:'POST',
            body:formData,
            cache: "no-cache",
            mode: "no-cors",
        })
        if(resp.status==200){
            setType('success')
            setMessage('Successfully submitted your data')
            showAlert(true)
            router.push('/blogs')
        }
    }
    return(
        <>
        <div className="contactForm w-full min-h-screen md:w-96">
                <div className="p-4">
                    <div className="bg-background-1 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                User Name
                            </label>
                            <input onChange={(e)=>setUserName(e.target.value)}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input type="password" onChange={(e)=>setPassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
                                <p className="text-red-500 text-xs italic">Enter description</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <button onClick={handleSubmit} className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {alert && <AlertMessage message={message} type={type} closeAlert={()=>showAlert(false)}/>}
            </>
    )
}

export default Login