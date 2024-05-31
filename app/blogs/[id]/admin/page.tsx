'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Playfair_Display } from 'next/font/google'
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import AlertMessage from '@/components/alertMessage/AlertMessage';

const Playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '400',
  variable:'--barlow-font'
})


function BlogPage({params:{id}}:{params:{id:string}}){
    const [data, setData] = useState<any>({})
    const [alert, showAlert] = useState(false)
    const router = useRouter();
    useEffect(()=>{ 
        console.log("in blogs useffect")
        getBlogData(id)     
    },[])
    function getBlogData(id:string){
        fetch(`/api/blogs/${id}`,{ cache: 'no-store' }).then((res)=>{
            res.json().then((result)=>{
                setData(result);
            })
        })
    }
    const approveBlog = (id:string, ver:boolean)=> {
        fetch(process.env.NEXT_PUBLIC_URL+`/api/blogs/${id}?approve=${ver}`,{ method:'POST', cache: 'no-store' }).then((res)=>{
            if(res.ok){
                getBlogData(id)
            } else {
                showAlert(true)
                router.push(`/blogs/${id}`)
            }
        }) 
    }
    const deleteBlog = (id:string)=> {
        fetch(process.env.NEXT_PUBLIC_URL+`/api/blogs/${id}`,{ method:'DELETE', cache: 'no-store' }).then((res)=>{
            if(res.ok){
                router.push(`/blogs/`)
                getBlogData(id)
            } else {
                showAlert(true)
                router.push(`/blogs/${id}`)
            }
        }) 
    }
    return(
        <>
        <div id="BlogpageMainContainer" className={`BlogpageMain ${Playfair.className} flex flex-col items-center bg-white w-screen`}>
            <div className="approveSection w-screen">
                <div className="approveContainer container p-5 float-right">
                    <button onClick={()=>approveBlog(id,!data?.blogs?.isVerfied)} className='w-40 bg-accent float-right text-xl text-white font-bold py-2 px-4 rounded'>
                    {data?.blogs?.isVerfied?'Reject':'Approve'}
                    </button>
                </div>
                <div className="approveContainer container p-5 float-right">
                    <button onClick={()=>deleteBlog(id)} className='w-40 bg-hazard float-right text-xl text-white font-bold py-2 px-4 rounded'>
                    Delete
                    </button>
                </div>
            </div>
            <div className="container p-2 text-wrap">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{data?.blogs?.text}</ReactMarkdown>
            </div>
        </div>
        {alert && <AlertMessage message='Please login to update' type='error' closeAlert={() => showAlert(false)} />}
        </>
    )
}

export default BlogPage