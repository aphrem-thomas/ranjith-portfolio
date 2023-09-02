const BlogsCard = (props:any)=>{
    return(
        <div onClick={()=>props.selectBlog(props.blog._id)}className="blogsCardmain cursor-pointer rounded-md shadow flex h-52 mb-3 w-full bg-secondary/20">
            <div className="descriptionbox p-3 w-3/4">
                <h1 className="header w-full text-3xl font-bold">{props.blog.heading}</h1>
                <h2 className="subhead mt-3 text-base h-24">{props.blog.subheading}</h2>
                <div className="authorName mt-2 text-right">{props.blog.username}</div>
                <div className="meta">
                    
                </div>
            </div>
            <div className="thumbnailImage bg-black-light w-1/4">
                <img className="h-full w-full object-cover"src={props.blog.thumbnail}/>
            </div>
        </div>
    )
}

export default BlogsCard