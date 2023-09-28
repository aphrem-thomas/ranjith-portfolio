import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Playfair_Display } from 'next/font/google'
import { useRouter } from "next/navigation";
import { authenticate } from '@/app/helper/authenticate';

const Playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '400',
  variable:'--barlow-font'
})

async function getBlogData(id:string){
    const data = await fetch(process.env.NEXT_PUBLIC_URL+`/api/blogs/${id}`,{ cache: 'no-store' })
    return data;
}

async function approveBlog(id:string){
    const data = await fetch(process.env.NEXT_PUBLIC_URL+`/api/blogs/${id}?approve=true`,{ method:'POST', cache: 'no-store' })
    return data;
}

async function BlogPage({params:{id}}:{params:{id:string}}){
    const blogData = await getBlogData(id)
    const data = await blogData.json()

    return(
        <div id="BlogpageMainContainer" className={`BlogpageMain ${Playfair.className} flex flex-col items-center bg-white w-screen`}>
            <div className="approveSection w-screen">
                <div className="approveContainer container">
                    <button className='bg-accent-comp w-40 text-xl text-accent font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                    {data.blogs.isVerfied?'Reject':'Approve'}
                    </button>
                </div>
            </div>
            <div className="container">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.blogs.text}</ReactMarkdown>
            </div>
        </div>
    )
}

export default BlogPage