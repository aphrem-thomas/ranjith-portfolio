'use client'

import { useState } from "react"


function Contacts() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [resume, setResume] = useState<any>('')
    async function handleSubmit(){
        const formData = new FormData()
        formData.append("name", name)
        formData.append('email',email)
        // formData.append('resume', resume)
        console.log("formData",formData)
        await fetch('api/contact/',{
            method:'POST',
            body:formData
        })
    }
    return (
        <div className="contactsMain container flex">
            <div className="disclaimer w-full ">
                <h1>Submit the form for free Resume review</h1>
                <div className="disclaimerMessage">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia officiis temporibus placeat adipisci animi sint doloremque quaerat, eligendi impedit distinctio tempore minima eos sit ipsam culpa, incidunt aliquam commodi explicabo!
                </div>
            </div>
            <div className="contactForm w-full ">
                <div className="w-full">
                    <form className="bg-background-1 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input onChange={(e)=>setName(e.target.value)}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input onChange={(e)=>setEmail(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="john@gmail.com"/>
                                <p className="text-red-500 text-xs italic">Please enter email.</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Resume
                            </label>
                            <input onChange={(e)=>{
                                if(e.target.files?.length){
                                    setResume(e.target.files[0])
                                }
                            }} accept=".pdf"className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="resume" type="file"/>
                                <p className="text-red-500 text-xs italic">Please attach resume in pdf.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <button onClick={handleSubmit}type="submit" className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contacts