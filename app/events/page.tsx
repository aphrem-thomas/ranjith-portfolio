'use client'

import JobCard from "@/components/JobCard/JobCard";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";

function getJobData(page=1) {
    return fetch(`api/events?page=${page}`).then((res)=>{
      return res.json()
    })
}

const getLinks = (id:string, count:number)=>{
  return(
    <>
    { [...Array(Math.ceil(count/10)).keys()].map(i=>
        <button
         className={`w-4 h-6 ml-2 ${parseInt(id)===i+1?'bg-background-4':'bg-background-1'} inline-block align-middle text-center`}
         key={i}
         onClick={()=>getJobData(i+1)}>{i+1}</button>)
    }
    </>
  )
}

function getNotice(text:string){
  return <div className="h-40 text-center w-full flex justify-center items-center"><span>{text}</span></div>
}

function Events() {
  const [eventList, setEventList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setLoading(true)
    fetch('api/events?page=1').then((res:any)=>{
      setLoading(false)
      res.json().then((data: { events: SetStateAction<never[]>; totalCount: SetStateAction<number>; })=>{
        setEventList(data.events)
        setCount(data.totalCount)
      }).catch(()=>{
        setLoading(false)
      })
    })
  },[])

  function deleteJob(id:string) {
    fetch(`api/events/?id=${id}`,{ method:'DELETE', cache: 'no-store' }).then(()=>{
      getJobData().then((data:any)=>setEventList(data.events))
    })
  }

  function approve(id:string) {
    fetch(`api/events?id=${id}&approve=${true}`,{ method:'PUT', cache: 'no-store' }).then(()=>{
      getJobData().then((data:any)=>setEventList(data.events))
    })
  }

  function forbid(id:string) {
    fetch(`api/events?id=${id}&approve=${false}`,{ method:'PUT', cache: 'no-store' }).then(()=>{
      getJobData().then((data:any)=>setEventList(data.events))
    })
  }
  return (
    <>
    <div className="headerImage w-full top-0 left-0 absolute z-20">
      <img className="h-48 w-full object-cover" src='/events.jpg'/>
    </div>
    <div className="bg-bg-jobs w-full min-h-screen flex flex-col items-center z-20">
    <div className="flex w-full h-24 justify-center items-center">
      <a href="/addevents">
        <button className='w-40 h-8 flex justify-center items-center text-xl border text-text py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline'>Add an Event</button>
      </a>
    </div>
      <div className="w-full md:container flex justify-center">
        <div className="jobListings w-full md:w-4/6 md:container p-4">
          {!loading?eventList.length?eventList.map((item: any) => {
            return (
              <div key={item._id} className="flex items-center w-full">
              <a className="w-full mt-2" href={item.url} target="_blank">
                <JobCard
                  bgColor="bg-white"
                  thumbnail={item.thumbnailurl}
                  heading={item.name}
                  location={item.location}
                  submitterName={item.submitter}
                  submitterEmail={item.submitter_email}
                  submittedDate={`${item.submittedDate.split('T')[0]}` }
                  link={item.url}
                />
              </a>
              {item.approved!==undefined && <div className="adminbuttons">
                <button className="bg-hazard ml-2 h-10 mb-2 w-20 cursor-pointer rounded-lg" onClick={()=>deleteJob(item._id)}>Delete</button>
                {item.approved===false?<button className="ml-2 bg-primary h-10 mb-2 w-20 cursor-pointer rounded-lg" onClick={()=>approve(item._id)}>Approve</button>
                :<button className="ml-2 bg-background-5 h-10 mb-2 w-20 cursor-pointer rounded-lg" onClick={()=>forbid(item._id)}>Forbid</button>}
              </div>}
              </div>
            );
          }):getNotice("No events listed"):getNotice("Loading...")}
        </div>
      </div>
      <div className="footerNav container mt-10 h-20 w-full flex items-center justify-center">
        <div className="pagination">
          {getLinks(page.toString(), count)}
        </div>
      </div>
    </div>
    </>
  );
}

export default Events;
