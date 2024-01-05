'use client'

import JobCard from "@/components/JobCard/JobCard";
import { useEffect, useState } from "react";
function getJobData() {
    return fetch(process.env.NEXT_PUBLIC_URL+'/api/jobs?page=1').then((res)=>{
      return res.json()
    })
}

function Jobs() {
  const [jobList, setJobList] = useState([]);
  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_URL+'/api/jobs?page=1').then((res)=>{
      res.json().then(data=>{
        setJobList(data.jobs)
      })
    })
  },[])

  function deleteJob(id:string) {
    fetch(process.env.NEXT_PUBLIC_URL+`/api/jobs/?id=${id}`,{ method:'DELETE', cache: 'no-store' }).then(()=>{
      getJobData().then((data:any)=>setJobList(data.jobs))
    })
  }
  return (
    <>
    <div className="headerImage w-full top-0 left-0 absolute z-20">
      <img className="h-48 w-full object-cover" src='/work.jpg'/>
    </div>
    <div className="bg-bg-jobs w-full min-h-screen flex flex-col items-center z-20">
      <div className="w-full md:container flex justify-center">
        <div className="jobListings ml-20 w-full md:w-4/6 md:container">
          {jobList.map((item: any) => {
            return (
              <div key={item._id} className="flex items-center">
              <a className="w-full h-32" href={item.url} target="_blank">
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
              <button className="bg-hazard ml-2 h-10 mb-2 w-32 cursor-pointer rounded-lg" onClick={()=>deleteJob(item._id)}>Delete</button>
              </div>
            );
          })}
        </div>
        <div className="sidebar w-2/6"></div>
      </div>
    </div>
    </>
  );
}

export default Jobs;
