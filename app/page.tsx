import Navbar from '@/components/navbar/navbar'
import WorkBanner from '@/components/workBanner/workbanner'
import Image from 'next/image'
import {Anton} from 'next/font/google'
import Events from '@/components/events/events'


const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable:'--anton-font'
})

async function getEventData() {
  const res = await fetch(`/api/events?page=1`,{ cache: "no-cache"});
  if (!res.ok) {
      throw new Error('Failed to fetch data')
  }
 const data  = await res.json()
 console.log("the data", data)
 return data.events
}



async function Home() {
  const data = await getEventData();
  return (
   <div className={`parent scroll-smooth flex w-full flex-col items-center md:max-w-5xl`}>
      <div className="flex relative flex-col items-center justify-center md:h-[calc(100vh-7rem)]">
        <div className="picAndText flex items-center w-full flex-col">
          {/* <div className="hello text-8xl mb-10 flex flex-col md:hidden">
            <div className={`text-text ${anton.className} tracking-[13px]`}>
              RANJITH
            </div>
            <div className={`text-text ${anton.className} tracking-[7px]`}>
              MATHEW
            </div>
          </div> */}
          
          <div className="intro mt-2 md:mt-2 flex flex-col-reverse md:flex-row justify-center items-center relative">
            <div className="statement flex-col p-4 md:w-2/3 text-xl text-justify">
              <div>Hi it&apos;s</div>
              <div className="text-4xl md:text-8xl mt-2">Ranjith Mathew</div>
              <p className="md:text-lg mt-7 animate-fade-up animate-infinite">
                A dedicated community builder and career management professional excels in fostering connections and providing expert guidance in job development, resume writing, and career mentorship. Their focus extends to supporting diverse individuals, including immigrants, graduates, and job seekers, through various initiatives. Active involvement in youth leadership programs and serving on nonprofit boards showcases a commitment to shaping the leaders of tomorrow. Outside of professional commitments, solace is found in fishing, whether casting a line in a local river or venturing to serene spots, allowing for a reconnection with nature and moments of tranquility amidst life&apos; s busyness.
              </p>
            </div>
            <div className="dpimage w-full md:w-auto flex flex-row-reverse mr-10 md:ml-4 md:flex-col md:justify-center md:relative md:mt-12 lg:mt-2 lg:h-[30rem]">
            <img
              src="/rm-profile.jpg"
              alt="pic"
              className="rounded-full rounded-bl-none h-60 max-w-full md:rounded-none md:h-full"
            />
          </div>
          </div>
        </div>
        <span className="absolute left-0 bottom-0 hidden md:flex h-10 w-10 animate-bounce">
           <a href="#work_banner"><img src="/arrow.png" className="rotate-90 h-10 w-10 rounded-full text-background text-center text-4xl"/></a> 
        </span>
      </div>
      <WorkBanner/>
      <Events events={data}/>
    </div>
  );
}

export default Home;