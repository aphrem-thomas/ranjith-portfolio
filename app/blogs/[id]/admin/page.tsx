'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Playfair_Display } from 'next/font/google'
import { redirect, useRouter } from "next/navigation";
import { authenticate } from '@/app/helper/authenticate';
import { useEffect, useState } from 'react';
import { Router } from 'next/router';
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
        getBlogData(id)     
    },[])
    function getBlogData(id:string){
        fetch(process.env.NEXT_PUBLIC_URL+`/api/blogs/${id}`,{ cache: 'no-store' }).then((res)=>{
            res.json().then((result)=>{
                console.log("results",result)
                setData(result);
            })
        })
    }
    const approveBlog = (id:string, ver:boolean)=> {
        fetch(process.env.NEXT_PUBLIC_URL+`/api/blogs/${id}?approve=${ver}`,{ method:'POST', cache: 'no-store' }).then((res)=>{
            console.log("res",res)
            if(res.ok){
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
            </div>
            <div className="container">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{data?.blogs?.text}</ReactMarkdown>
            </div>
        </div>
        {alert && <AlertMessage message='Please login to update' type='error' closeAlert={() => showAlert(false)} />}
        </>
    )
}

export default BlogPage