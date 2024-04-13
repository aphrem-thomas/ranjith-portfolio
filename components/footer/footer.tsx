import { useEffect, useState } from 'react';

function Footer () {
   
    return(
        <>
        <div className="footermain bg-text text-background-1 w-full p-2 flex justify-center h-32">
            <div className="rmfootercontact flex items-center justify-between w-full md:max-w-5xl">
                <div className="basiccontact">
                    <div className="text-xm">Ranjith Mathew</div>
                    <div className="text-xs">Director</div>
                    <div className="text-xs">rm@gmail.com</div>
                </div>
                <div className="socialmedia flex w-32 justify-between">
                    <a href=''><img className="h-8" src="/icons/facebook.png"></img></a>
                    <a href=''><img className="h-8" src="/icons/linkedin.png"></img></a>
                    <a href=''><img className="h-8" src="/icons/twitter.png"></img></a>
                </div>
                <div className="sitedeveloper flex ">
                    <div className="dev text-[3px] h-8 md:text-sm underline">Developed by, <a target="_blank" href="https://www.linkedin.com/in/aphremthomas/">Aphrem Thomas</a></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer;