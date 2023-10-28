import JobCard from "@/components/JobCard/JobCard";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
async function getPreviewImage(uri:any){
    const data:any = await getLinkPreview(uri);
    console.log(data.images)
    return data.images;
}
async function Jobs() {
    const imgLink = await getPreviewImage("https://www.npmjs.com/package/link-preview-generator");
    const jobList:any =[
        {
            id:"123",
            link:"https://mycareer.hsbc.com/en_GB/external/PipelineDetail/Consultant-Specialist/209189?utm_source=Discover+Technata+job+board&utm_medium=getro.com&gh_src=Discover+Technata+job+board",
            role:"Senior FullStack Developer",
            company:"Cisco",
            location:"Ottawa, CA",
            department:"Finance",
            thumbnailurl:"https://cdn.pixabay.com/photo/2023/09/16/21/31/girl-8257551_1280.jpg"
        }
    ]
    const dummyFun =()=>console.log("dummy clicked")
  return (
    <div className="bg-bg-jobs w-screen min-h-screen flex flex-col items-center shadow-md">
      <h1>Jobs</h1>
      <div className="h-10 container">
      <div className="jobListings">
        {jobList.map((item:any)=>{
            return(
                <a href={item.link} target="_blank">
                <JobCard
                    bgColor="bg-white"
                    thumbnail={item.thumbnailurl}
                    heading={item.role}
                    subheading={item.company}
                    location = {item.location}
                    footer={item.department}
                    link = {item.link}
                />
                </a>
            )
        })}
      </div>
      <div className="sidebar"></div>
      </div>
    </div>
  );
}

export default Jobs;
