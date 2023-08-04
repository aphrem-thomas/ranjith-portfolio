// import { useState } from "react";
import {Anton} from 'next/font/google'
import Link from "next/link";

const anton = Anton({
    subsets: ['latin'],
    weight: '400',
    variable:'--anton-font'
  })

function WorkBanner () {
    // const [activeTab, setActiveTab] = useState('home')
    return(
        <div className="banner w-screen mt-40 bg-accent p-5 flex flex-col h-full items-center">
            
        </div>
    )
}

export default WorkBanner;