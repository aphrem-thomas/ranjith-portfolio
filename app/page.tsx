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
    <div className={`parent flex w-full flex-col items-center`}>
      <div className="container flex">
        <div className="picAndText flex items-center w-full flex-col">
          <div className="hello text-8xl mb-10 flex flex-col md:hidden">
              <div className={`text-text ${anton.className} tracking-[13px]`}>RANJITH</div>
              <div className={`text-text ${anton.className} tracking-[7px]`}>MATHEW</div>
            </div>
          <div className="dpimage lg:h-[35rem] 2xl:h-[46rem] h-full flex flex-row md:flex-col md:justify-center md:relative md:mt-12">
            <img
              src="/Ranjith.jpg"
              alt="pic"
              className="w-auto h-auto max-w-full max-h-full"
            />
            <div className="hidden md:flex hello lg:left-[19rem] 2xl:left-[26rem] lg:top-20  2xl:top-40 absolute lg:text-4xl 2xl:text-6xl bg-text h-24 lg:w-52 2xl:w-80 mb-10 flex-col justify-center items-center">
              <p className="text-background ">Hi it&apos;s Ranjith...</p>
            </div>
          </div>
          <div className="intro mt-2 md:mt-10 flex flex-col justify-center items-center relative">
            <div className="statement p-4 md:w-2/3 text-xl text-justify">
              <p>
                Ranjith Mathew is a passionate community builder,
                skilled in fostering connections and a talented career
                management professional with expertise in job
                development, resume writing, and career mentorship
                for individuals including new immigrants, recent
                graduates, and job seekers. He actively engages in
                community development and youth leadership
                initiatives and serves as a board member for several
                youth-focused nonprofit organizations in Canada.
              </p>
            </div>
          </div>
        </div>
      </div>
      <WorkBanner/>
    </div>
  )
}
