"use client";
// import { useState } from "react";
import { Anton } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const anton = Anton({
    subsets: ["latin"],
    weight: "400",
    variable: "--anton-font",
});

function getDropdownBgColor(currentRoute: any) {
    if (currentRoute.includes("/jobs")) {
        return "bg-white";
    } else {
        return "bg-background";
    }
}

function getBgColor(currentRoute: any) {
    if (currentRoute.includes("/jobs") || currentRoute.includes("/events")) {
        return "bg-transparent";
    } else if (currentRoute.includes("/blogs")) {
        return "bg-background-2";
    } else {
        return "bg-background";
    }
}

function getHeader(currentRoute: string){
    let primeRoute = currentRoute.split('/')[1] ;
    if (primeRoute === 'contact')
        return ''
    return primeRoute;
}

function Navbar() {
    const currentRoute = usePathname();
    // const [activeTab, setActiveTab] = useState('home')
    const [dropdown, setDropdown] = useState(false);
    const router = useRouter()
    const ref = useRef<any>(null);

    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
    return (
        <div ref={ref}
            className={`navwrapper z-30 w-full flex flex-col  items-center ${getBgColor(
                currentRoute
            )}`}
        >
            <nav className="flex relative w-full text-2xl p-4 md:p-0 justify-center  items-center h-28 md:max-w-5xl md:justify-normal">
                <div
                onClick={()=>{router.push('/')}}
                    className={`tradeMark z-50 cursor-pointer ${currentRoute.includes("/jobs") || currentRoute.includes("/events") ? "text-white" : ""
                        } ${anton.className} hidden sm:block`}
                >
                    RM
                </div>
                <button
                    onClick={() => setDropdown(!dropdown)}
                    className="z-50 group h-20 absolute left-0 ml-4 md:hidden"
                >
                    <div className="flex flex-col justify-between w-[20px] h-[20px] ">
                        <div
                            className={` ${currentRoute.includes("/jobs") || currentRoute.includes("/events") ? "bg-white" : "bg-text"
                                } h-[2px] w-7`}
                        ></div>
                        <div
                            className={` ${currentRoute.includes("/jobs") || currentRoute.includes("/events") ? "bg-white" : "bg-text"
                                } h-[2px] w-7`}
                        ></div>
                        <div
                            className={` ${currentRoute.includes("/jobs") || currentRoute.includes("/events") ? "bg-white" : "bg-text"
                                } h-[2px] w-7`}
                        ></div>
                    </div>
                </button>
                <div className="header w-full absolute flex justify-center">
                    <div className={`text-text text-3xl uppercase  ${currentRoute.includes("/jobs") || currentRoute.includes("/events") ? "text-white" : "text-text"}` }>{getHeader(currentRoute)}</div>
                </div>
                <div
                    id="navbar-default"
                    className={`hidden z-10 navigation ${currentRoute.includes("/jobs") || currentRoute.includes("/events") ? "bg-transparent text-white" : ""
                        } underline-offset-8 decoration-primary flex-col justify-end container text-2xl md:flex md:flex-row`}
                >
                    <Link
                        className={`home ${currentRoute === "/" ? "underline" : ""} ml-2`}
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className={`home ${currentRoute === "/contact" ? "underline" : ""
                            } ml-2`}
                        href="/contact"
                    >
                        Contact
                    </Link>
                    {/* <Link className={`home ${currentRoute==='/works'?'underline':''} w-10 ml-10`} href="/works">Works</Link> */}
                    <Link
                        className={`home ${currentRoute.includes("/blogs") ? "underline" : ""
                            } ml-2`}
                        href="/blogs"
                    >
                        Blogs
                    </Link>
                    <Link
                        className={`home ${currentRoute.includes("/jobs") ? "underline" : ""
                            } ml-2`}
                        href="/jobs/1"
                    >
                        Jobs
                    </Link>
                    <Link
                        className={`home ${currentRoute.includes("/events") ? "underline" : ""
                            } ml-2`}
                        href="/events"
                    >
                        Events
                    </Link>
                </div>
                <div
                    id="navbar-mobile"
                    onClick={() => setDropdown(!dropdown)}
                    className={`navigation absolute w-40 left-4 top-20
                ${getDropdownBgColor(currentRoute)}
                text-text
                underline-offset-8 decoration-primary flex flex-col justify-end container text-2xl
                h-0 overflow-hidden transition-[height] duration-50 ease-in-out z-50
                ${dropdown
                            ? "h-40 border-[1px] border-solid rounded-sm shadow-sm"
                            : ""
                        }
            `}
                >
                    <Link
                        className={`home w-full ${currentRoute === "/" ? "bg-background-1" : ""} pl-2`}
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className={`home ${currentRoute === "/contact" ? "bg-background-1" : ""
                            } pl-2`}
                        href="/contact"
                    >
                        Contact
                    </Link>
                    {/* <Link className={`home ${currentRoute==='/works'?'underline':''} w-10 ml-10`} href="/works">Works</Link> */}
                    <Link
                        className={`home ${currentRoute.includes("/blogs") ? "bg-background-1" : ""
                            } pl-2`}
                        href="/blogs"
                    >
                        Blogs
                    </Link>
                    <Link
                        className={`home ${currentRoute.includes("/jobs") ? "bg-background-1" : ""
                            } pl-2`}
                        href="/jobs/1"
                    >
                        Jobs
                    </Link>
                    <Link
                        className={`home ${currentRoute.includes("/events") ? "bg-background-1" : ""
                            } pl-2`}
                        href="/events"
                    >
                        Events
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
