import Navbar from '@/components/navbar/navbar'
import WorkBanner from '@/components/workBanner/workbanner'
import Image from 'next/image'


export default function Home() {
  return (
    <div className={`parent flex w-full flex-col items-center h-[calc(100vh-6rem)]`}>
      <div className="container flex">
        <div className="picAndText flex mt-40 h-[40rem] justify-center w-full">
          <div className="dpimage h-full flex-1 flex flex-row justify-end">
            <img
              src="/Ranjith.jpg"
              alt="pic"
              className="h-auto"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="intro flex flex-1 flex-col justify-center relative">
            <div className="hello -left-20 top-16 absolute text-6xl bg-text h-24 w-80 mb-10 flex flex-col justify-center items-center">
              <p className="text-background ">Hi it's Ranjith...</p>
            </div>
            <div className="statement h-44 ml-5 w-80 text-xl">
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
