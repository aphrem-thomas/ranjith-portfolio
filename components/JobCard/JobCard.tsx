import { checkIsOnDemandRevalidate } from "next/dist/server/api-utils"

const JobCard = (props:any)=>{
    return(
        <div className={`jobsCardmain cursor-pointer flex w-ful drop-shadow-md hover:drop-shadow-lg ${props.bgColor} p-2`}>
            <div className="thumbnailImage w-20 h-20 ">
                <img className="h-full w-full object-fit"src={props.thumbnail}/>
            </div>
            <div className="w-full flex">
                <div className="descriptionbox ml-6 flex flex-col content-around">
                    <div className="authorName text-lg mt-0 font-semibold">{props.heading}</div>
                    <h1 className="header w-full text-sm">{props.subheading}</h1>
                    <div className="locationandtype flex items-center">
                        <h2 className="subhead text-sm overflow-hidden">{props.location}</h2>
                        <div className="ml-2 subhead flex text-sm border-[0.5px] rounded-md p-2 h-4 items-center justify-center overflow-hidden">
                            <span>{props.footer}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="readmore hidden md:flex  w-40 justify-center items-center">
                <div className="readmoretext text-sm">Read more</div>
            </div>
        </div>
    )
}

export default JobCard