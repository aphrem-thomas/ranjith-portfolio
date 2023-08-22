'use client'
import AlertMessage from "@/components/alertMessage/AlertMessage"
import BlogsCard from "@/components/BlogsCard/BlogsCard"
import { useEffect, useState } from "react"

function Blogs(props: any) {
   
    const [message, setMessage] = useState('')
    const [tags, setTags] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [article, setArticle] = useState<any>('')
    const [type, setType] = useState<any>('')
    const [alert, showAlert] = useState(false)
    const [blogs, setBlogs] = useState([])

    useEffect(()=>{
        fetch('/api/blogs').then((res)=>{
            res.json().then(data=>{
                setBlogs(data.blogs)
            })
        })

    },[])
    async function handleSubmit() {
        console.log("in submit", alert)
        if (name === '' || email === '' || article === '' || tags === '') {
            setType('error')
            setMessage('Please fill all fields')
            showAlert(true)
            console.log("ale ale", alert)
            return
        }
        const formData = new FormData()
        formData.append("name", name)
        formData.append('email', email)
        formData.append('article', article)
        formData.append('tags', tags)
        let resp = await fetch('api/blogs', {
            method: 'POST',
            body: formData,
            cache: "no-cache",
            mode: "no-cors",
        })
        if (resp.ok) {
            setType('success')
            setMessage('Successfully submitted your data')
            showAlert(true)
        }
    }
    return (
        <>
            <div className="blogmain flex">
                <div className="showblogs">
                    {
                        blogs && blogs.length && blogs.map((blog: any) => {
                            return (
                                <BlogsCard blog={blog} />
                            )
                        })
                    }
                </div>
                <div className="w-full">
                    <div className="bg-background-1 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="john@gmail.com" />
                            <p className="text-red-500 text-xs italic">Please enter email.</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Article
                            </label>
                            <textarea onChange={(e) => setArticle(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                            <p className="text-red-500 text-xs italic">Enter description</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tags
                            </label>
                            <input onChange={(e) => setTags(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="john@gmail.com" />
                            <p className="text-red-500 text-xs italic">Please enter email.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <button onClick={handleSubmit} className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {alert && <AlertMessage message={message} type={type} closeAlert={() => showAlert(false)} />}
        </>
    )
}

export default Blogs