// import { useState } from "react";
import { Anton } from "next/font/google";
// import { useEffect, useState } from "react";

function getScreenType(resolution:any): string {
  if (resolution > 1536) return "2xl";
  else if (resolution > 1280) return "xl";
  else if (resolution > 1024) return "lg";
  else if (resolution > 768) return "md";
  else if (resolution > 640) return "sm";
  return "";
}
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--anton-font",
});
const workLinks = [
  '6947989831419392000',

  '6894427825252691968',
  '6614274473162092544',
  '6577014888378564608',
  '6949716820765392897',
  '6988890725035753472',
  '6790822426369490944',
  '6951612774665904128',
  '6947576278577270784',
  '6944819559887503360',
  '6757675407228604416',
  '6747149264973123585',
  '6599129408295043073',
  '6572993024530493440',
  '7005674165185785857',
  '6469682871002107904',
  '6973102261698752512',
]
function getContentWidth(type: string) {
  switch (type) {
    case "sm":
      return "250";
    case "md":
      return "400";
    case "lg":
      return "400";
    case "xl":
      return "400";
    case "2xl":
      return "400";
    default:
      return "250";
  }
}

function WorkBanner() {
    // const [screenSize, setWindowSize] = useState('0');
    //   useEffect(() => {
    //     console.log("in use effect")
    //     if(typeof window !== undefined){
    //         setWindowSize(getContentWidth(getScreenType(window.innerWidth)));  
    //         const handleWindowResize = () => {
    //             setWindowSize(getContentWidth(getScreenType(window.innerWidth)));
    //           };
          
    //           window.addEventListener('resize', handleWindowResize);
          
    //           return () => {
    //             window.removeEventListener('resize', handleWindowResize);
    //           };
    //     }
    //   }, []);
  return (
    <div id="work_banner" className="workbanner p-4 w-full md:mt-0">
      <div className="heading flex items-center mt-10 mb-4 md:text-8xl">
        <span className="works text-3xl whitespace-nowrap">Notable works</span>
        <span className="line m-2 h-[1px] w-full bg-text"></span>
      </div>
      <div className="banner w-full overflow-x-scroll overflow-y-hidden p-5 flex h-full">
        {workLinks.map((id) => (
          <div key={id} className="bannerItem mt-12 ml-2 p-4 border-[1px] border-solid border-text bg-white">
            <iframe
              src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${id}`}
              height="453"
              width="250"
              title="Embedded post"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkBanner;
