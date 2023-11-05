import JobCard from "@/components/JobCard/JobCard";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
async function getJobData() {
    const res = await fetch(process.env.NEXT_PUBLIC_URL+'/api/jobs?page=1');
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
   const data  = await res.json()
   return data.jobs
}
async function Jobs() {
  const jobList = await getJobData()
  const dummyFun = () => console.log("dummy clicked");
  return (
    <div className="bg-bg-jobs w-screen min-h-screen flex flex-col items-center">
      <div className="h-10 container">
        <div className="jobListings ml-20  w-4/6">
          {jobList.map((item: any) => {
            return (
              <a href={item.url} target="_blank">
                <JobCard
                  bgColor="bg-white"
                  thumbnail={item.thumbnailurl}
                  heading={item.role}
                  subheading={item.company}
                  location={item.location}
                  footer={item.department}
                  link={item.url}
                />
              </a>
            );
          })}
        </div>
        <div className="sidebar w-2/6"></div>
      </div>
    </div>
  );
}

export default Jobs;
