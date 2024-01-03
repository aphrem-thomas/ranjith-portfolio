'use client'

import AlertMessage from "@/components/alertMessage/AlertMessage"
import { useState } from "react"


function Contacts() {

    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [resume, setResume] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [alert, showAlert] = useState(false)

    async function handleSubmit(){
        if(name==='' || email ==='' ||resume ==='' ||description===''){
            setType('error')
            setMessage('Please fill all fields')
            showAlert(true)
            return
        }
        const formData = new FormData()
        formData.append("name", name)
        formData.append('email',email)
        formData.append('resume', resume)
        formData.append('description', description)
        let resp = await fetch('api/contact',{
            method:'POST',
            body:formData,
            cache: "no-cache",
            mode: "no-cors",
        })
        if(resp.ok){
            setType('success')
            setMessage('Successfully submitted your data')
            showAlert(true)
            setEmail('')
            setDescription('')
            setName('')
            setResume('')
        }
    }
    return (
        <>
        <div className="contactsMain flex flex-col items-center">
            <div className="disclaimer p-10 md:p-0 md:mt-10 md:container">
                <h1 className="text-2xl font-bold">Submit the form for free Resume review</h1>
                <div className="disclaimerMessage mt-10 leading-6">
                <p>As the Technical Resource Manager, my primary responsibilities encompass generating fresh sales leads, overseeing account management, and adeptly identifying outstanding technical talents, particularly for software and hardware development enterprises throughout North America. Leveraging my remarkable networking skills and talent for fostering relationships, I excel at engaging with clients and aiding them in forming high-achieving teams. </p>
                <p>Beyond my professional endeavors, I derive immense satisfaction from forging community ties and offering invaluable career guidance to newcomers in Canada. My profound dedication to nurturing skills in the leaders of tomorrow drives me to actively participate in volunteer work for non-profit organizations and educational institutions.</p>
                <p>When I seek moments of serenity and a deeper connection with the natural world, I find solace in the art of fishing. Whether it involves casting a line in a nearby river or embarking on an excursion to a tranquil fishing spot, fishing serves as a means of relaxation and reconnection for me.</p></div>
            </div>
            <div className="contactForm md:container md:mt-10 md:flex md:justify-center">
                <div className="md:w-[30rem]">
                    <div className="bg-background-1 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input value={name} onChange={(e)=>setName(e.target.value)}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="john@gmail.com"/>
                                <p className="text-red-500 text-xs italic">Please enter email.</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Message
                            </label>
                            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
                                <p className="text-red-500 text-xs italic">Enter description</p>
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
                            <button onClick={handleSubmit} className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {alert && <AlertMessage message={message} type={type} closeAlert={()=>showAlert(false)}/>}
        </>
    )
}

export default Contacts