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
        <div className="banner w-screen mt-40 bg-text p-5 flex flex-col items-center">
            <h3 className="text-white mb-5 text-3xl">I have membership in</h3>
            <div className="worklist flex flex-wrap justify-around container">
                <div className="logo">
                    <img className="w-40 h-14 object-contains grayscale"src="iccc.png"/>
                </div>
                <div className="logo">
                    <img className="w-40 h-14 object-contains grayscale" src="jci.webp"/>
                </div>
                <div className="logo">
                    <img className="w-40 h-14 object-contains grayscale" src="obot.png"/>
                </div>
                <div className="logo">
                    <img className="w-40 h-14 object-contains grayscale" src="ociso.svg"/>
                </div>
                <div className="logo">
                    <img className="w-40 h-14 object-contains grayscale" src="tekno.png"/>
                </div>
                <div className="logo">
                    <img className="w-40 h-14 object-contains grayscale" src="EOTB.webp"/>
                </div>
                <div className="logo">
                    <img className="w-40 h-14 object-contains grayscale" src="tie.png"/>
                </div>
                <div className="logo">
                    <img className="w-40 h-14 object-contains grayscale" src="World-Skills.png"/>
                </div>
            </div>
        </div>
    )
}

export default WorkBanner;