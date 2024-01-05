import JobCard from "@/components/JobCard/JobCard";
import { getPossibleInstrumentationHookFilenames } from "next/dist/build/utils";
import Link from "next/link";
import Image from 'next/image'

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

  const getLinks = (id:string)=>{
    let links=[];
    for(let i=1; i<=(Math.ceil(count/10)); i++){
       links.push(<Link
        className={`w-4 h-6 ml-2 ${parseInt(id)===i?'bg-background-4':'bg-background-1'} inline-block align-middle text-center`}
        key={i}
        href={`${process.env.NEXT_PUBLIC_URL}/jobs/${i}`}>{i}</Link>)
    }
    return links;
  }

  return (
    <>
    <div className="headerImage w-full top-0 left-0 absolute z-20">
      <img className="h-48 w-full object-cover" src='/work.jpg'/>
    </div>
    <div className="bg-bg-jobs w-full min-h-screen flex flex-col content-center items-center z-20">
      <div className=" w-full md:container flex flex-col mt-10 justify-center items-center">
        <div className="jobListings min-h-[58vh] w-full md:w-4/6 flex flex-col items-center p-4">
          {jobList.map((item: any) => {
            return (
              <a className="w-full h-32" key={item._id} href={item.url} target="_blank">
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
      <div className="footerNav container mt-10 h-20 w-full flex items-center justify-center">
        <div className="pagination">
          {getLinks(params.id)}
        </div>
      </div>
    </div>
    </>
  );
}

export default Jobs;
