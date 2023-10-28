const JobCard = (props:any)=>{
    return(
        <div className={`jobsCardmain h-40 cursor-pointer flex mb-8 w-full shadow-md ${props.bgColor} p-2`}>
            <div className="thumbnailImage w-36 ">
                <img className="h-full w-full object-fit"src={props.thumbnail}/>
            </div>
            <div className="descriptionbox ml-10">
                <div className="authorName text-3xl mt-0 font-bold">{props.heading}</div>
                <h1 className="header w-full text-xl font-bold">{props.subheading}</h1>
                <h2 className="subhead mt-3 text-base overflow-hidden">{props.location}</h2>
                <h2 className="subhead mt-3 text-base overflow-hidden">{props.footer}</h2>
            </div>
        </div>
    )
}

export default JobCard