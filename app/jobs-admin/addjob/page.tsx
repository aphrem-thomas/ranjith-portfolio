'use client'

import AlertMessage from "@/components/alertMessage/AlertMessage"
import { useState } from "react"


function Addjob() {

    const [url, setUrl] = useState('')
    const [company, setCompany] = useState('')
    const [domain, setDomain] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [location, setLocation] = useState<any>('')
    const [role, setRole] = useState<any>('')
    const [alert, showAlert] = useState(false)

    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    
    async function handleSubmit(){
        if(url==='' || company ==='' ||domain ==='' ||location===''||role === '' ){
            setType('error')
            setMessage('Please fill all fields')
            showAlert(true)
            return
        }
        const formData = new FormData()
        formData.append("url", url)
        formData.append('company',company)
        formData.append('domain', domain)
        formData.append('location', location)
        formData.append('role', role)
        let resp = await fetch('/api/jobs',{
            method:'POST',
            body:formData,
            cache: "no-cache",
            mode: "no-cors",
        })
        if(resp.ok){
            setType('success')
            setMessage('Successfully submitted your data')
            showAlert(true)
            setRole('')
            setCompany('')
            setDomain('')
            setLocation('')
            setUrl('')
        }
    }
    return (
        <>
        <div className="contactsMain p-4 w-full flex">
            <div className="contactForm w-full">
                <div className="w-full">
                    <div className="bg-background-1 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Link
                            </label>
                            <input value={url} onChange={(e)=>setUrl(e.target.value)}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="url" type="text" placeholder="jobs.microsoft.com"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Role
                            </label>
                            <input value={role} onChange={(e)=>setRole(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="company" type="text" placeholder="software developer"/>
                                <p className="text-red-500 text-xs italic">Please role (like software developer)</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Company
                            </label>
                            <input value={company} onChange={(e)=>setCompany(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="company" type="text" placeholder="Microsoft"/>
                                <p className="text-red-500 text-xs italic">Please enter the company</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Location
                            </label>
                            <input value={location} onChange={(e)=>setLocation(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="ottawa"/>
                                <p className="text-red-500 text-xs italic">Please enter location.</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Domain
                            </label>
                            <input value={domain} onChange={(e)=>setDomain(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="domain" type="text" placeholder="Azure"/>
                                <p className="text-red-500 text-xs italic">Please enter domain.</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Thumbnail image url
                            </label>
                            <input value={thumbnail} onChange={(e)=>setThumbnail(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="thumbnailurl" type="text" placeholder="https://hydroottawa.com/themes/custom/hydro/favicon.ico"/>
                                <p className="text-red-500 text-xs italic">Please enter thumbnail url</p>
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

export default Addjob