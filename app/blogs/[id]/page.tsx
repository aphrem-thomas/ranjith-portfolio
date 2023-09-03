import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Playfair_Display } from 'next/font/google'

const Playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '400',
  variable:'--barlow-font'
})
async function getBlogData(id:string){
    const data = await fetch('http://localhost:3000'+`/api/blogs/${id}`,{ cache: 'no-store' })
    return data;
}
async function BlogPage({params:{id}}:{params:{id:string}}){
    const blogData = await getBlogData(id)
    const data = await blogData.json()
    return(
        <div className={`BlogpageMain ${Playfair.className} flex justify-center bg-white w-screen`}>
            <div className="container">
                <ReactMarkdown children={data.blogs.text} remarkPlugins={[remarkGfm]}/>
            </div>
        </div>
    )
}

export default BlogPage