
async function getBlogData(id:string){
    const data = await fetch('http://localhost:3000'+`/api/blogs/${id}`)
    return data;
}
function BlogPage({params:{id}}:{params:{id:string}}){
    const blogData = getBlogData(id)
    return(
        <div className="BlogpageMain">
            howdi partner {id}
        </div>
    )
}

export default BlogPage