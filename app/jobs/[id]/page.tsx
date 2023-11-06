import JobCard from "@/components/JobCard/JobCard";
import { getPossibleInstrumentationHookFilenames } from "next/dist/build/utils";
import Link from "next/link";

async function getJobData(id:string) {
    const res = await fetch(process.env.NEXT_PUBLIC_URL+`/api/jobs?page=${id}`,{ cache: "no-cache"});
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
   const data  = await res.json()
   console.log("data",data);
   return data
}



async function Jobs({ params }: { params: { id: string } }) {
  const data = await getJobData(params.id);
  const jobList = data.jobs
  const count = data.totalCount

  const getLinks = ()=>{
    let links=[];
    for(let i=1; i<=(Math.ceil(count/10)); i++){
       links.push(<Link
        className="w-4 h-6 ml-2 bg-background-3 inline-block"
        key={i}
        href={`${process.env.NEXT_PUBLIC_URL}/jobs/${i}`}>{i}</Link>)
    }
    return links;
  }

  return (
    <>
    <div className="bg-bg-jobs w-screen min-h-screen flex flex-col items-center">
      <div className="container">
        <div className="jobListings ml-20 w-4/6">
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
      <div className="footerNav container mt-10 w-full flex items-center content-center">
        <div className="pagination">
          {getLinks()}
        </div>
      </div>
    </div>
    </>
  );
}

export default Jobs;
