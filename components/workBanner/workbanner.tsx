"use client";

// import { useState } from "react";
import { Anton } from "next/font/google";

function getScreenType(): string {
  const resolution = window.innerWidth;
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

function getContentWidth(type: string) {
  switch (type) {
    case "sm":
      return "250";
    case "md":
      return "600";
    case "lg":
      return "600";
    case "xl":
      return "600";
    case "2xl":
      return "600";
  }
}
const screenSize = getContentWidth(getScreenType());

function WorkBanner() {
  return (
    <div  id="work_banner" className="workbanner w-full mt-96 md:mt-0 bg-background-2">
        <div className="heading flex justify-center mt-10 mb-4 text-4xl md:text-8xl">
            Notable works
        </div>
      <div className="banner w-full overflow-y-scroll p-5 flex h-full md:flex md:flex-wrap md:overflow-hidden md:justify-around ">
        <div className="bannerItem mt-12 p-4">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6469682871002107904"
            height="453"
            width={screenSize}
            title="Embedded post"
          ></iframe>
        </div>
        <div className="bannerItem mt-12 p-4">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:7005674165185785857"
            height="453"
            width={screenSize}
            title="Embedded post"
          ></iframe>
        </div>
        <div className="bannerItem mt-12 p-4">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6988890725035753472"
            height="453"
            width={screenSize}
            title="Embedded post"
          ></iframe>
        </div>

        <div className="bannerItem mt-12 p-4">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6973102261698752512"
            height="453"
            width={screenSize}
            title="Embedded post"
          ></iframe>
        </div>

        <div className="bannerItem mt-12 p-4">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:6967620616208142336"
            height="453"
            width={screenSize}
            title="Embedded post"
          ></iframe>
        </div>

        <div className="bannerItem mt-12 p-4">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6951612774665904128"
            height="453"
            width={screenSize}
            title="Embedded post"
          ></iframe>
        </div>

        <div className="bannerItem mt-12 p-4">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6949716820765392897"
            height="453"
            width={screenSize}
            title="Embedded post"
          ></iframe>
        </div>

        <div className="bannerItem mt-12 p-4">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6947989831419392000"
            height="453"
            width={screenSize}
            title="Embedded post"
          ></iframe>
        </div>

        <div className="bannerItem mt-12 p-4">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6947576278577270784"
            height="453"
            width={screenSize}
            title="Embedded post"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default WorkBanner;
