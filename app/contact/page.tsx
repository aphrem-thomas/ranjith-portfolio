'use client'

import AlertMessage from "@/components/alertMessage/AlertMessage"
import { useState } from "react"


function Contacts() {

    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [resume, setResume] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [alert, showAlert] = useState(false)

    async function handleSubmit(){
        if(firstname ==='' || lastname==='' || email ==='' ||resume ==='' ||description===''){
            setType('error')
            setMessage('Please fill all fields')
            showAlert(true)
            return
        }
        const formData = new FormData()
        console.log("data", firstname, lastname, email, resume, description)
        formData.append("name", firstname+' '+lastname)
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
            setFirstName('')
            setLastName('')
            setResume('')
        }
    }
    return (
        <>
        <div className="contactsMain flex  items-center md:content-centre md:max-w-5xl md:h-[calc(100vh-7rem)]">
            <div className="flex flex-col md:flex-row">
            <div className="disclaimer p-10 md:p-0 md:max-w-5xl">
                <div>Submit the form for</div>
                <h1 className="text-2xl md:text-6xl font-bold">Free Resume review</h1>
                <div className="disclaimerMessage mt-5 leading-6">
                <p>In the role of Technical Resource Manager, primary responsibilities involve, overseeing account management, generating new sales leads and identifying top technical talent, especially for software and hardware development companies across North America. Leveraging exceptional networking abilities and relationship-building talent, excellence is achieved in client engagement and assisting them in building successful teams.</p>
                <br/>
                <p className="text font-bold">Discalimer</p>
                <p className="text text-sm italic">Please note that by submitting your resume for a free 15-minute consulting session, you consent to the collection and use of your personal information solely for the purpose of providing career guidance and employment assistance. Your information will be treated confidentially and will not be shared with any third parties without your explicit consent.</p>
            </div>
            </div>
            <div className="contactForm md:container md:flex md:justify-center md:ml-10">
                <div className="md:w-[30rem]">
                    <div className="bg-background-1 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                First name
                            </label>
                            <input value={firstname} onChange={(e)=>setFirstName(e.target.value)}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Last name
                            </label>
                            <input value={lastname} onChange={(e)=>setLastName(e.target.value)}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John"/>
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
        </div>
        {alert && <AlertMessage message={message} type={type} closeAlert={()=>showAlert(false)}/>}
        </>
    )
}

export default Contacts