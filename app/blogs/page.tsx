"use client";
import AlertMessage from "@/components/alertMessage/AlertMessage";
import BlogsCard from "@/components/BlogsCard/BlogsCard";
import { clearPreviewData } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { data } from "autoprefixer";

function Blogs(props: any) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [article, setArticle] = useState<any>("");
  const [type, setType] = useState<any>("");
  const [alert, showAlert] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [showModal, showModalSet] = useState(false);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubheading] = useState("");
  const [tagList, setTagList] = useState([""]);
  const [selected, setSelected] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true)
    fetch("/api/blogs").then((res) => {
      setLoading(false)
      res.json().then((data) => {
        setBlogs(data.blogs);
      });
    });
  }, []);

  useEffect(() => {
    getAllTags();
  }, [blogs]);

  function getAllTags() {
    let tags: string[] = [];
    let outTags = [];
    blogs.forEach((blog: any) => {
      tags.push(...blog.tags);
    });
    outTags = [...new Set(tags)];
    setTagList([...new Set(tags)]);
  }
  function clearData() {
    setName("");
    setEmail("");
    setArticle("");
    setTags("");
    setThumbnail("");
    setHeading("");
    setSubheading("");
  }
  async function handleSubmit(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (
      name === "" ||
      email === "" ||
      article === "" ||
      tags === "" ||
      heading === "" ||
      subHeading === ""
    ) {
      setType("error");
      setMessage("Please fill all fields");
      showModalSet(false);
      showAlert(true);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("article", article);
    formData.append("tags", tags);
    formData.append("thumbnail", thumbnail);
    formData.append("heading", heading);
    formData.append("subheading", subHeading);
    let resp = await fetch("api/blogs", {
      method: "POST",
      body: formData,
      cache: "no-cache",
      mode: "no-cors",
    });
    if (resp.ok) {
      clearData();
      showModalSet(false);
      setType("success");
      setMessage("Successfully submitted your data");
      showAlert(true);
    }
  }

  function tagSelect(tag: string) {
    if (selected === tag) {
      setSelected("");
    } else setSelected(tag);
  }

  function clickBlog(id: string) {
    router.push(`/blogs/${id}`);
  }
function getNotice(text:string){
  return <div className="h-40 text-center w-full flex justify-center items-center"><span>{text}</span></div>
}

  function processArticle(mdfile: any) {
    let fr = new FileReader();
    fr.readAsText(mdfile);
    fr.onload = () => {
      setArticle(fr.result);
    };
    fr.onerror = () => {
      setType("error");
      setMessage("error in reading file");
      showAlert(true);
    };
  }
  return (
    <>
      <div className="blogsMain w-full md:max-w-5xl min-h-screen flex flex-col items-center">
        <div className="blogmain relative flex flex-col md:flex-row-reverse container">
          <div
            onClick={() => {
              console.log("out tag");
              tagSelect("");
            }}
            className="tagsSelection bg-background-2 md:w-1/5 md:bg-background sticky top-0 p-4 md:mt-6"
          >
            <div className="tagList p-2 h-full">
              <div className="categories text-4xl">Categories</div>
              <div className="tagListDisplay  mt-4 max-h-48 md:max-h-[calc(100vh-350px)] overflow-auto">
                {tagList.map((tag) => {
                  return (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("in tag");
                        tagSelect(tag);
                      }}
                      key={tag}
                      className={`tags text-center h-8 mb-2 inline-flex items-center bg-background-1 ml-2 p-1 rounded-xl pl-5 pr-5 ${
                        selected === tag ? "text-white bg-background-3" : ""
                      }`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              <div className="w-full mt-4 mb-4 flex">
                <button
                  onClick={() => {
                    showModalSet(true);
                  }}
                  className="w-60 bg-text text-xl text-white py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                >
                  Submit article
                </button>
              </div>
            </div>
          </div>
          <div className="showblogs w-full flex flex-col p-2 mt-4">
            {!loading ? (
              blogs.length?
              blogs
                .filter((blog: any) =>
                  !selected ? true : blog.tags.includes(selected)
                )
                .map((blog: any, index) => {
                  return (
                    <BlogsCard
                      className="mt-1"
                      key={blog._id}
                      blog={blog}
                      selectBlog={clickBlog}
                    />
                  );
                }):getNotice("No Blogs listed")
            ) : (
              <div>{getNotice("Loading...")}</div>
            )}
          </div>

          {showModal && (
            <form>
              <div className="formModal w-full z-40 bg-white/80 fixed left-0 top-0 justify-center p-4 h-full flex items-center">
                <div className="bg-background-1 w-full md:max-w-lg p-10 rounded shadow">
                  <div className="nameAndEmail">
                    <div className="mb-2">
                      <label className="block text-gray-700 text-sm font-bold">
                        Full Name
                        <span className="star text-hazard">*</span>
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="John"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700 text-sm font-bold">
                        Email
                        <span className="star text-hazard">*</span>
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="john@gmail.com"
                      />
                      <p className="text-red-500 text-xs italic">
                        Please enter email.
                      </p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Heading
                      <span className="star text-hazard">*</span>
                    </label>
                    <input
                      value={heading}
                      onChange={(e) => setHeading(e.target.value)}
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="Minimalism"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Sub Heading
                      <span className="star text-hazard">*</span>
                    </label>
                    <input
                      value={subHeading}
                      onChange={(e) => setSubheading(e.target.value)}
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="Relationship between minimalism and human psychology."
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Article
                      <span className="star text-hazard">*</span>
                    </label>
                    <input
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          processArticle(e.target.files[0]);
                        }
                      }}
                      accept=".md"
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="article"
                      type="file"
                    />
                    <p className="text-red-500 text-xs italic">
                      Only use Markdown files (.md)
                    </p>
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Thumbnail url
                      <span className="star text-hazard">*</span>
                    </label>
                    <input
                      value={thumbnail}
                      onChange={(e) => setThumbnail(e.target.value)}
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <p className="text-red-500 text-xs italic">
                      Enter Url of royaltee free Image
                    </p>
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Tags
                      <span className="star text-hazard">*</span>
                    </label>
                    <input
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="money, budget"
                    />
                    <p className="text-red-500 text-xs italic">
                      Please enter tags separeated by comma.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={handleSubmit}
                      className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        showModalSet(false);
                        clearData();
                      }}
                      className="font-bold text-text py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
        {alert && (
          <AlertMessage
            message={message}
            type={type}
            closeAlert={() => showAlert(false)}
          />
        )}
      </div>
    </>
  );
}

export default Blogs;
