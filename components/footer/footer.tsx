import { useEffect, useState } from 'react';

function Footer () {
   
    return(
        <>
        <div className="footermain bg-text text-background-1 w-full p-4 flex  justify-center min-h-32">
            <div className="rmfootercontact flex flex-col items-center justify-center md:justify-between w-full md:max-w-5xl">
                <div className='flex items-center w-full md:max-w-5xl'>
                    <div className="basiccontact w-full">
                    </div>
                    <div className="socialmedia ml-10 flex w-full justify-end">
                        <a target="_blank" href='https://www.facebook.com/ranjithmathew.ca'><img className="h-8 ml-2" src="/icons/facebook.png"></img></a>
                        <a target="_blank" href='https://www.linkedin.com/in/ranjithmathew/'><img className="h-8 ml-2" src="/icons/linkedin.png"></img></a>
                        <a target="_blank" href='https://twitter.com/mathew_ranjith'><img className="h-8 ml-2" src="/icons/twitter.png"></img></a>
                        <a target="_blank" href='https://www.youtube.com/@ranjithmathew.canada'><img className="h-8 ml-2" src="/icons/youtube.png"></img></a>
                    </div>
                </div>
                <div className="sitedeveloper flex mt-4 ">
                    <div className="dev text-sm h-8 md:text-md underline">Developed by, <a target="_blank" href="https://www.linkedin.com/in/aphremthomas/">Aphrem Thomas</a></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer;