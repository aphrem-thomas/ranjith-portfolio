const BlogsCard = (props:any)=>{
    return(
        <div onClick={()=>props.selectBlog(props.blog._id)} className="blogsCardmain border-l-2 h-40 cursor-pointer flex mb-8 w-full">
            <div className="descriptionbox w-3/4 ml-2">
                <div className="authorName mt-0">{props.blog.username}</div>
                <h1 className="header w-full text-3xl font-bold">{props.blog.heading}</h1>
                <h2 className="subhead mt-3 text-base overflow-hidden h-12">{props.blog.subheading}</h2>
                <div className="meta">
                    
                </div>
            </div>
            <div className="thumbnailImage bg-black-light w-1/4 ml-2">
                <img className="h-full w-full object-cover"src={props.blog.thumbnail}/>
            </div>
            {props.blog.isVerfied!==undefined && props.blog.isVerfied== false && <div className="vefiyButton bg-hazard w-10">
            </div>}
        </div>
    )
}

export default BlogsCard