import { checkIsOnDemandRevalidate } from "next/dist/server/api-utils"

const JobCard = (props:any)=>{
    return(
        <div className={`jobsCardmain cursor-pointer flex w-full shadow-md ${props.bgColor} p-1 mb-4`}>
            <div className="thumbnailImage w-36 ">
                <img className="h-full w-full object-fit"src={props.thumbnail}/>
            </div>
            <div className="w-full flex">
                <div className="descriptionbox ml-2 flex flex-col content-around">
                    <div className="authorName text-3xl mt-0 font-semibold">{props.heading}</div>
                    <h1 className="header w-full text-xl font-bold">{props.subheading}</h1>
                    <h2 className="subhead text-base overflow-hidden">{props.location}</h2>
                    <h2 className="subhead text-base overflow-hidden">{props.footer}</h2>
                </div>
            </div>
        </div>
    )
}

export default JobCard