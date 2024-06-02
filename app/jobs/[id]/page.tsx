import JobCard from "@/components/JobCard/JobCard";
import { getPossibleInstrumentationHookFilenames } from "next/dist/build/utils";
import Link from "next/link";
import Image from 'next/image'
import { connect } from "@/app/config/db.config";
import Jobs from "@/app/model/jobs.model";


async function Page({ params }: { params: { id: string } }) {
  const jobList = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/jobs?page=${params.id}`,{ cache: 'no-store' });
  const data = await jobList.json()
  const getLinks = (id:string)=>{
    let links=[];
    for(let i=1; i<=(Math.ceil(data.totalCount/10)); i++){
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
    <div className="flex w-full h-24 justify-center items-center">
      <a href="/addjob">
        <button className='w-40 h-8 flex justify-center items-center text-xl border text-text py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline'>Add Job</button>
      </a>
    </div>
      <div className=" w-full md:container flex flex-col justify-center items-center">
        <div className="jobListings min-h-[58vh] w-full md:w-4/6 flex flex-col items-center p-4">
          {data.jobs.length? data.jobs.map((item: any) => {
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
                  submittedDate={`${item.submittedDate.toString().split('T')[0]}` }
                />
              </a>
            );
          }):"No jobs listed"}
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

export default Page;
