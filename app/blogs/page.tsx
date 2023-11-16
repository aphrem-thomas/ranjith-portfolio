'use client'
import AlertMessage from "@/components/alertMessage/AlertMessage"
import BlogsCard from "@/components/BlogsCard/BlogsCard"
import { clearPreviewData } from "next/dist/server/api-utils"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { data } from "autoprefixer"

function Blogs(props: any) {

    const [message, setMessage] = useState('')
    const [tags, setTags] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [article, setArticle] = useState<any>('')
    const [type, setType] = useState<any>('')
    const [alert, showAlert] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [thumbnail, setThumbnail] = useState('');
    const [showModal, showModalSet] = useState(false);
    const [heading, setHeading] = useState('');
    const [subHeading, setSubheading] = useState('');
    const [tagList, setTagList] = useState(['']);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/blogs').then((res) => {
            res.json().then(data => {
                setBlogs(data.blogs)
            })
        })

    }, [])

    useEffect(()=>{
        getAllTags()
    },[blogs])

    function getAllTags(){
        let tags: string[] = [];
        let outTags = []
        blogs.forEach((blog:any)=>{
            tags.push(...blog.tags)
        })
        outTags = [...new Set(tags)]
        setTagList([...new Set(tags)]);
    }
    function clearData() {
        setName('')
        setEmail('')
        setArticle('')
        setTags('')
        setThumbnail('')
        setHeading('')
        setSubheading('')
    }
    async function handleSubmit() {
        if (name === '' || email === '' || article === '' || tags === '' || heading === '' || subHeading === '') {
            setType('error')
            setMessage('Please fill all fields')
            showAlert(true)
            return
        }
        const formData = new FormData()
        formData.append("name", name)
        formData.append('email', email)
        formData.append('article', article)
        formData.append('tags', tags)
        formData.append('thumbnail', thumbnail)
        formData.append('heading', heading)
        formData.append('subheading', subHeading)
        let resp = await fetch('api/blogs', {
            method: 'POST',
            body: formData,
            cache: "no-cache",
            mode: "no-cors",
        })
        if (resp.ok) {
            clearData()
            showModalSet(false)
            setType('success')
            setMessage('Successfully submitted your data')
            showAlert(true)
        }
    }

    function clickBlog(id: string) {
       router.push(`/blogs/${id}`)
    }

    function processArticle(mdfile: any) {
        let fr = new FileReader()
        fr.readAsText(mdfile);
        fr.onload = () => {
            setArticle(fr.result)
        }
        fr.onerror = () => {
            setType('error')
            setMessage('error in reading file')
            showAlert(true)
        }
    }
    return (
        <>
        <div className="blogsMain w-full min-h-screen flex flex-col items-center bg-white">
        <div className="headBanner w-full bg-accent h-40 flex flex-col items-center">
                <div className="headBannerWrapper container flex p-2 justify-between">
                    <div className="writeHeader text-9xl text-accent-comp">Write</div>
                    <img className="w-32" src='/paper.svg'/>
                </div>
            </div>
            <div className="p-2 sticky w-full top-24 left-0 bg-accent z-10 flex items-center justify-end h-20 addBlogButton">
                <button onClick={() => { showModalSet(true) }} className="bg-accent-comp w-40 text-xl text-accent font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit article</button>
            </div>

            <div className="blogmain relative flex flex-col container p-2">
                <div className="tagsSelection sticky top-48">
                    <div className="tagList bg-white-accent p-2 h-full">
                        <h2 className="text-2xl font-bold">Topics</h2>
                        <div className="tagListDisplay mt-4">
                        {tagList.map((tag)=>{
                            return(
                                <span key={tag} className="tags text-center h-8 mb-2 inline-flex items-center bg-background-1 ml-2 p-1 rounded-xl pl-5 pr-5">{tag}</span>
                            )
                        })}
                        </div>
                    </div>
                </div>
                <div className="showblogs flex flex-col">
                    {
                        blogs && blogs.length && blogs.map((blog: any, index) => {
                            return (
                                <BlogsCard className="mt-1" key={blog._id} blog={blog} selectBlog={clickBlog} />
                            )
                        })
                    }
                </div>
                
                {showModal && <div className="formModal z-20 bg-white/80 fixed left-0 top-0 justify-center w-full h-full flex items-center">
                    <div className="bg-background-1 w-1/3 p-10 rounded shadow">
                        <div className="nameAndEmail flex justify-between">
                            <div className="mb-2 w-2/5">
                                <label className="block text-gray-700 text-sm font-bold">
                                    Name
                                </label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John" />
                            </div>
                            <div className="mb-2 w-2/5">
                                <label className="block text-gray-700 text-sm font-bold">
                                    Email
                                </label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="john@gmail.com" />
                                <p className="text-red-500 text-xs italic">Please enter email.</p>
                            </div>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Heading
                            </label>
                            <input value={heading} onChange={(e) => setHeading(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Minimalism" />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Sub Heading
                            </label>
                            <input value={subHeading} onChange={(e) => setSubheading(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Relationship between minimalism and human psychology." />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Article
                            </label>
                            <input onChange={(e) => {
                                if (e.target.files?.length) {
                                    processArticle(e.target.files[0])
                                }
                            }} accept=".md" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="article" type="file" />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Thumbnail url
                            </label>
                            <input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" />
                            <p className="text-red-500 text-xs italic">Enter Url of royaltee free image</p>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tags
                            </label>
                            <input value={tags} onChange={(e) => setTags(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="money, budget" />
                            <p className="text-red-500 text-xs italic">Please enter tags separeated by comma.</p>
                        </div>
                        <div className="flex items-center">
                            <button onClick={handleSubmit} className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Submit
                            </button>
                            <button onClick={() => { showModalSet(false); clearData() }} className="font-bold text-text py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
            {alert && <AlertMessage message={message} type={type} closeAlert={() => showAlert(false)} />}
        </div>
        </>
    )
}

export default Blogs