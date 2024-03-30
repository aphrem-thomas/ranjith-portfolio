import Navbar from '@/components/navbar/navbar'
import WorkBanner from '@/components/workBanner/workbanner'
import Image from 'next/image'
import {Anton} from 'next/font/google'


const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable:'--anton-font'
})

export default function Home() {
  return (
   <div className={`parent scroll-smooth flex w-full flex-col items-center md:max-w-5xl`}>
      <div className="flex flex-col items-center justify-center md:h-[calc(100vh-7rem)]">
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
              <div>Hi it,s</div>
              <div className="text-4xl md:text-6xl mt-2">Ranjith Mathew</div>
              <p className="md:text-lg mt-7 animate-fade-up animate-infinite">
                I am a passionate community builder, skilled in
                fostering connections and a talented career management
                professional with expertise in job development, resume writing,
                and career mentorship for individuals including new immigrants,
                recent graduates, and job seekers. I actively engages in
                community development and youth leadership initiatives and
                serves as a board member for several youth-focused nonprofit
                organizations in Canada.
              </p>
              <p className="md:text-lg">Beyond my professional endeavors, I derive immense satisfaction from forging community ties and offering invaluable career guidance to newcomers in Canada. My profound dedication to nurturing skills in the leaders of tomorrow drives me to actively participate in volunteer work for non-profit organizations and educational institutions.</p>
              <p className="md:text-lg">When I seek moments of serenity and a deeper connection with the natural world, I find solace in the art of fishing. Whether it involves casting a line in a nearby river or embarking on an excursion to a tranquil fishing spot, fishing serves as a means of relaxation and reconnection for me.</p>
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
        <span className="absolute bottom-0 hidden md:flex h-10 w-10 animate-bounce">
           <a href="#work_banner"><img src="/arrow.png" className="rotate-90 h-10 w-10 rounded-full text-background text-center text-4xl"/></a> 
        </span>
      </div>
      <WorkBanner/>
    </div>
  );
}
