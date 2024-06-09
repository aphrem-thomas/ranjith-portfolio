"use client";

import AlertMessage from "@/components/alertMessage/AlertMessage";
import { useState } from "react";

function Contacts() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [alert, showAlert] = useState(false);

  async function handleSubmit(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      resume === "" ||
      description === ""
    ) {
      setType("error");
      setMessage("Please fill all fields");
      showAlert(true);
      return;
    }
    const formData = new FormData();
    
    formData.append("name", firstname + " " + lastname);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("description", description);
    let resp = await fetch("api/contact", {
      method: "POST",
      body: formData,
      cache: "no-cache",
      mode: "no-cors",
    });
    if (resp.ok) {
      setType("success");
      setMessage("Successfully submitted your data");
      showAlert(true);
      setEmail("");
      setDescription("");
      setFirstName("");
      setLastName("");
      setResume("");
    } else {
      setType("error");
      setMessage("error in subimitting data");
      showAlert(true);
      setEmail("");
      setDescription("");
      setFirstName("");
      setLastName("");
      setResume("");
    }
  }
  return (
    <>
      <div className="contactsMain flex min-h-screen md:mt-20 md:content-centre md:max-w-5xl">
        <div className="flex flex-col md:flex-row">
          <div className="disclaimer p-10 md:p-0 md:max-w-5xl">
            <div>Submit the form for</div>
            <h1 className="text-2xl md:text-6xl font-bold">
              Free Resume review
            </h1>
            <div className="disclaimerMessage mt-5 leading-6">
              <p>
                Throughout my career, I have assisted over 1,000 new graduates
                and newcomers in Ottawa in finding job opportunities in the
                business and IT security industries. My proficiency in community
                outreach and stakeholder development enables me to build new
                collaborations, driving solutions for nonprofits and business
                leaders alike. Close contacts often whisper about me as the
                #networKING, however my goal is to be your connector,
                facilitating the achievement of both organizational and personal
                goals for everyone involved in the conversation.
              </p>
              <br />
              <p>
                In my current position as Technical Resource Manager, my main
                duties include overseeing account management, creating new
                hiring opportunities, and identifying top technical talent,
                particularly for software and hardware development companies
                across North America. By leveraging my exceptional networking
                skills and talent for building relationships, I excel in client
                engagement and help clients build successful teams.
              </p>
              <br />
              <p className="text font-bold">Disclaimer</p>
              <p className="text text-sm italic">
                Please note that by submitting your resume for a free 15-minute
                consulting session, you consent to the collection and use of
                your personal information solely for the purpose of providing
                career guidance and employment assistance. Your information will
                be treated confidentially and will not be shared with any third
                parties without your explicit consent.
              </p>
            </div>
          </div>
          <div className="contactForm md:container md:flex md:justify-center md:ml-10">
            <form autoComplete="off">
              <div className="md:w-[30rem]">
                <div className="bg-background-1 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      First name
                      <span className="star text-hazard">*</span>
                    </label>
                    <input
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="John"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last name
                      <span className="star text-hazard">*</span>
                    </label>
                    <input
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Denver"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                      <span className="star text-hazard">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="john@gmail.com"
                    />
                    <p className="text-red-500 text-xs italic">
                      Please enter email.
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Message
                      <span className="star text-hazard">*</span>
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <p className="text-red-500 text-xs italic">
                      Enter description
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Resume
                      <span className="star text-hazard">*</span>
                    </label>
                    <input
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          setResume(e.target.files[0]);
                        }
                      }}
                      accept=".pdf,.doc, .docx"
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="resume"
                      type="file"
                    />
                    <p className="text-red-500 text-xs italic">
                      Please attach resume in pdf or doc format.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleSubmit}
                      className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {alert && (
        <AlertMessage
          message={message}
          type={type}
          closeAlert={() => showAlert(false)}
        />
      )}
    </>
  );
}

export default Contacts;
