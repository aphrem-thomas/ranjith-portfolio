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
        <div className="banner w-full overflow-y-scroll mt-40 bg-accent p-5 flex  h-full ">
            <div className="bannerItem mt-12 p-4">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6469682871002107904" height="453" frameborder="0" allowfullscreen="" title="Embedded post"></iframe> 
            </div>
            <div className="bannerItem mt-12 p-4">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7005674165185785857" height="453" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
            </div>
            <div className="bannerItem mt-12 p-4">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6988890725035753472" height="453" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
            </div>

            <div className="bannerItem mt-12 p-4">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6973102261698752512" height="453" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
            </div>

            <div className="bannerItem mt-12 p-4">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:6967620616208142336" height="453" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
            </div>

            <div className="bannerItem mt-12 p-4">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6951612774665904128" height="453" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
            </div>

            <div className="bannerItem mt-12 p-4">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6949716820765392897" height="453" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
            </div>

            <div className="bannerItem mt-12 p-4">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6947989831419392000" height="453" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
            </div>

            <div className="bannerItem mt-12 p-4">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6947576278577270784" height="453" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
            </div>

            </div>
    )
}

export default WorkBanner;