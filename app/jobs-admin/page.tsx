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
    fetch('api/jobs?page=1').then((res)=>{
      res.json().then(data=>{
        setJobList(data.jobs)
      })
    })
  },[])

  function deleteJob(id:string) {
    fetch(`api/jobs/?id=${id}`,{ method:'DELETE', cache: 'no-store' }).then(()=>{
      getJobData().then((data:any)=>setJobList(data.jobs))
    })
  }

  function approve(id:string) {
    fetch(`api/jobs?id=${id}&approve=${true}`,{ method:'PUT', cache: 'no-store' }).then(()=>{
      getJobData().then((data:any)=>setJobList(data.jobs))
    })
  }

  function forbid(id:string) {
    fetch(`api/jobs?id=${id}&approve=${false}`,{ method:'PUT', cache: 'no-store' }).then(()=>{
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
        <div className="jobListings w-full md:w-4/6 md:container">
          {jobList.map((item: any) => {
            return (
              <div key={item._id} className="flex items-center w-full">
              <a className="w-full h-40" href={item.url} target="_blank">
                <JobCard
                  bgColor="bg-white"
                  thumbnail={item.thumbnailurl}
                  heading={item.role}
                  subheading={item.company}
                  location={item.location}
                  footer={item.department}
                  submitterName={item.submitter}
                  submitterEmail={item.submitter_email}
                  submittedDate={`${item.submittedDate.split('T')[0]}` }
                  link={item.url}
                />
              </a>
              <div className="adminbuttons">
                <button className="bg-hazard ml-2 h-10 mb-2 w-20 cursor-pointer rounded-lg" onClick={()=>deleteJob(item._id)}>Delete</button>
                {item.approved===false?<button className="ml-2 bg-primary h-10 mb-2 w-20 cursor-pointer rounded-lg" onClick={()=>approve(item._id)}>Approve</button>
                :<button className="ml-2 bg-background-5 h-10 mb-2 w-20 cursor-pointer rounded-lg" onClick={()=>forbid(item._id)}>Forbid</button>}
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}

export default Jobs;
