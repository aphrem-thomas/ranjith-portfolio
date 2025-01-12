import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Playfair_Display } from 'next/font/google'

const Playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '400',
  variable:'--barlow-font'
})

async function getBlogData(id:string){
    const data = await fetch(process.env.NEXT_PUBLIC_URL+`/api/blogs/${id}`,{ cache: 'no-store' })
    return data;
}


async function BlogPage({params:{id}}:{params:{id:string}}){
    const blogData = await getBlogData(id)
    const data = await blogData.json()

    return(
        <div id="BlogpageMainContainer" className={`BlogpageMain ${Playfair.className} flex flex-col items-center p-4 w-screen md:max-w-5xl`}>
            <div className="container p-2 text-wrap">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.blogs?.text}</ReactMarkdown>
            </div>
        </div>
    )
}

export default BlogPage