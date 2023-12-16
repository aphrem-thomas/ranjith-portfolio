"use client";
// import { useState } from "react";
import { Anton } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const anton = Anton({
    subsets: ["latin"],
    weight: "400",
    variable: "--anton-font",
});

function getBgColor(currentRoute: any) {
    if (currentRoute.includes("/jobs")) {
        return "bg-transparent";
    } else if (currentRoute.includes("/blogs")) {
        return "bg-white";
    } else {
        return "bg-background";
    }
}

function getHeader(currentRoute: string){
    let primeRoute = currentRoute.split('/')[1] ;
    return primeRoute;
}

function Navbar() {
    const currentRoute = usePathname();
    // const [activeTab, setActiveTab] = useState('home')
    const [dropdown, setDropdown] = useState(false);
    return (
        <div
            className={`navwrapper z-30 w-full flex flex-col  items-center ${getBgColor(
                currentRoute
            )}`}
        >
            <nav className="flex relative w-full text-2xl p-4 justify-center items-center h-28">
                <div
                    className={`tradeMark ${currentRoute.includes("/jobs") ? "text-white" : ""
                        } ${anton.className} hidden sm:block`}
                >
                    Ranjith Mathew
                </div>
                <button
                    onClick={() => setDropdown(!dropdown)}
                    className="group h-20 absolute left-0 ml-4"
                >
                    <div className="flex flex-col justify-between w-[20px] h-[20px] ">
                        <div
                            className={` ${currentRoute.includes("/jobs") ? "bg-white" : "bg-text"
                                } h-[2px] w-7`}
                        ></div>
                        <div
                            className={` ${currentRoute.includes("/jobs") ? "bg-white" : "bg-text"
                                } h-[2px] w-7`}
                        ></div>
                        <div
                            className={` ${currentRoute.includes("/jobs") ? "bg-white" : "bg-text"
                                } h-[2px] w-7`}
                        ></div>
                    </div>
                </button>
                <div className="header">
                    <div className="text-text text-3xl uppercase">{getHeader(currentRoute)}</div>
                </div>
                <div
                    id="navbar-default"
                    className={`hidden navigation ${currentRoute.includes("/jobs") ? "bg-transparent text-white" : ""
                        } underline-offset-8 decoration-primary flex flex-col justify-end container text-2xl`}
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
                </div>
                <div
                    id="navbar-mobile"
                    onClick={() => setDropdown(!dropdown)}
                    className={`navigation absolute w-40 left-4 top-20
                bg-background 
                text-text
                underline-offset-8 decoration-primary flex flex-col justify-end container text-2xl
                h-0 overflow-hidden transition-[height] duration-50 ease-in-out
                ${dropdown
                            ? "h-32 border-[1px] border-solid rounded-sm shadow-sm"
                            : ""
                        }
            `}
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
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
