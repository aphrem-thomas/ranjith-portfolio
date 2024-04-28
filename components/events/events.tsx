// import { useState } from "react";
import { Anton } from "next/font/google";
import JobCard from "../JobCard/JobCard";
// import { useEffect, useState } from "react";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--anton-font",
});

function Events({events}:any) {
    
  return (
    <div id="events" className="events p-4 w-full md:mt-0">
      <div className="heading flex items-center mt-10 mb-4 md:text-8xl">
        <span className="works text-3xl whitespace-nowrap">Upcoming events</span>
        <span className="line m-2 h-[1px] w-full bg-text"></span>
      </div>
      <div className="banner w-full p-5 flex flex-col h-full">
        {events && events.length && events.slice(0,4).map((item:any) => (
          <a key={item._id} target="_blank" href={item.url} className="mt-2">
              <JobCard
              bgColor="bg-white"
              thumbnail={item.thumbnailurl}
              heading={item.name}
              location={item.location}
              submittedDate={`${item.submittedDate.toString().split('T')[0]}` }
              link={item.url}
              />
          </a>
        ))}
      </div>
      {events.length>3 && <div className="moreEvents text-center underline text-primary">
        <a href="/events">more events...</a>
      </div>}
    </div>
  );
}

export default Events;
