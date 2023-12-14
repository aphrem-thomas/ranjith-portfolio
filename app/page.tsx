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
          <div className="hello text-8xl mb-10 flex flex-col">
              <div className={`text-text ${anton.className} tracking-[13px]`}>RANJITH</div>
              <div className={`text-text ${anton.className} tracking-[7px]`}>MATHEW</div>
            </div>
          <div className="dpimage h-full flex-1 flex flex-row justify-end">
            <img
              src="/Ranjith.jpg"
              alt="pic"
              className="h-auto"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="intro mt-8 flex flex-1 flex-col justify-center items-center relative">
            <div className="statement h-44  w-80 text-xl text-justify">
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
