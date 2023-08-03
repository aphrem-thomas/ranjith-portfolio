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
    console.log("currentRoute",currentRoute);
    // const [activeTab, setActiveTab] = useState('home')
    return(
        <nav className="flex flex-row container text-2xl h-10 items-center mt-7 mb-7">
            <div className={`tradeMark ml-20 w-52 ${anton.className}`}>Ranjith Mathew</div>
            <div className="navigation underline-offset-8 decoration-primary flex flex-row justify-end container text-2xl">
                <Link className={`home ${currentRoute==='/'?'underline':''}  w-10 ml-10`} href="/">Home</Link>
                <Link className={`home ${currentRoute==='/contact'?'underline':''} w-10 ml-10`} href="/contact">Contact</Link>
                <Link className={`home ${currentRoute==='/works'?'underline':''} w-10 ml-10`} href="/works">Works</Link>
            </div>
            
        </nav>
    )
}

export default Navbar;