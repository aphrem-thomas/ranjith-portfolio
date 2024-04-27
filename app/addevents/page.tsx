'use client'

import AlertMessage from "@/components/alertMessage/AlertMessage"
import { useRouter } from "next/navigation"

import { isValidElement, useState } from "react"


function AddEvents() {

    const [url, setUrl] = useState('')
    const [name, setName] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [location, setLocation] = useState<any>('')
    const [alert, showAlert] = useState(false)

    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [submitter, setSubmitter] = useState('')
    const [emailSubmitter, setEmailSubmitter] = useState('')
    const router = useRouter()
    
    async function handleSubmit(){
        if(url==='' ||location===''|| submitter==='' || emailSubmitter==='' ){
            setType('error')
            setMessage('Please fill all fields')
            showAlert(true)
            return
        }
        const formData = new FormData()
        formData.append("url", url)
        formData.append("name", name)
        formData.append('location', location)
        formData.append('submitter', submitter)
        formData.append('submitter_email',emailSubmitter)
        let resp = await fetch('/api/events',{
            method:'POST',
            body:formData,
            cache: "no-cache",
            mode: "no-cors",
        })
        console.log("response",resp)
        if(resp){
            setType(resp.ok?'success':'error')
            setMessage(resp.ok?'Successfully submitted your data':'error please try after sometime')
            showAlert(true)
            setLocation('')
            setUrl('')
        }
    }

    function isValidForm(){
        if(!(url && location  && submitter  && emailSubmitter)){
            return false
        }
        return true
    }
    return (
        <>
        <div className="contactsMain p-4 w-full flex flex-col md:max-w-5xl min-h-screen">
            <div className="description mb-2">
                The Event listing that you submit will be published after review.
            </div>
            <div className="contactForm w-full">
                <div className="w-full">
                    <div className="bg-background-1 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Link to this event <span className="star text-hazard">*</span>
                            </label>
                            <input value={url} onChange={(e)=>setUrl(e.target.value)}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="url" type="text" placeholder="jobs.microsoft.com"/>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Name of the event <span className="star text-hazard">*</span>
                            </label>
                            <input value={name} onChange={(e)=>setName(e.target.value)}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Ottawa Tech connect 2024"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Event Location <span className="star text-hazard">*</span>
                            </label>
                            <input value={location} onChange={(e)=>setLocation(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="ottawa"/>
                                <p className="text-red-500 text-xs italic">Please enter location.</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Thumbnail image url
                            </label>
                            <input value={thumbnail} onChange={(e)=>setThumbnail(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" id="thumbnailurl" type="text" placeholder="https://hydroottawa.com/themes/custom/hydro/favicon.ico"/>
                                <p className="text-red-500 text-xs italic">Please enter thumbnail image url, not mandatory though.</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Who is submitting? <span className="star text-hazard">*</span>
                            </label>
                            <div className="flex">
                                <div className="mr-2">
                                    <input value={submitter} onChange={(e)=>setSubmitter(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" id="thumbnailurl" type="text" placeholder="Alice Bob"/>
                                    <p className="text-red-500 text-sm">Name</p>
                                </div>
                                <div className="ml-2">
                                    <input value={emailSubmitter} onChange={(e)=>setEmailSubmitter(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" id="thumbnailurl" type="text" placeholder="alicebob@gmail.com"/>
                                    <p className="text-red-500 text-sm">email</p>
                                </div>
                            </div>
                            <p className="text-red-500 text-xs italic">Your name and email will not be shown in the event listing.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <button onClick={handleSubmit} className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Submit
                            </button>
                            <a href="/events">
                                <button className=" text-text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Cancel
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {alert && <AlertMessage message={message} type={type} closeAlert={()=>{
            showAlert(false)
            router.push('/events')
            }}/>}
        </>
    )
}

export default AddEvents