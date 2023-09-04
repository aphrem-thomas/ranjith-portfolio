'use client'
// import { useState } from "react";
import {Anton} from 'next/font/google'
import Link from "next/link";
import { usePathname } from 'next/navigation';



const anton = Anton({
    subsets: ['latin'],
    weight: '400',
    variable:'--anton-font'
  })

function Navbar () {
    {/* Get the current route */}
    const currentRoute = usePathname();
    // const [activeTab, setActiveTab] = useState('home')
    return(
        <div className={`navwrapper sticky z-10 top-0 left-0 w-screen flex flex-col items-center ${currentRoute.includes('/blogs')?'bg-accent text-background':''}`}>
        <nav className="flex flex-row container text-2xl h-10 items-center mt-7 mb-7">
            <div className={`tradeMark ml-20 w-52 ${anton.className}`}>Ranjith Mathew</div>
            <div className="navigation underline-offset-8 decoration-primary flex flex-row justify-end container text-2xl">
                <Link className={`home ${currentRoute==='/'?'underline':''}  w-10 ml-10`} href="/">Home</Link>
                <Link className={`home ${currentRoute==='/contact'?'underline':''} w-10 ml-10`} href="/contact">Contact</Link>
                {/* <Link className={`home ${currentRoute==='/works'?'underline':''} w-10 ml-10`} href="/works">Works</Link> */}
                <Link className={`home ${currentRoute.includes('/blogs')?'underline':''} w-10 ml-10`} href="/blogs">Blogs</Link>
                <Link className={`home ${currentRoute==='/jobs'?'underline':''} w-10 ml-10`} href="/jobs">Jobs</Link>
            </div>
            
        </nav>
        </div>
    )
}

export default Navbar;