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
    <div className="bg-bg-jobs w-screen min-h-screen flex flex-col items-center">
      <div className="h-10 container">
        <div className="jobListings ml-20  w-4/6">
          {jobList.map((item: any) => {
            return (
              <div key={item._id} className="flex">
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
              <button onClick={()=>deleteJob(item._id)}>Delete</button>
              </div>
            );
          })}
        </div>
        <div className="sidebar w-2/6"></div>
      </div>
    </div>
  );
}

export default Jobs;
