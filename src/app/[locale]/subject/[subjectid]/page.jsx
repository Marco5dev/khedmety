import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import initTranslations from "@/i18n.js";
const i18nNamespaces = ["common"];
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default async function Subject({ params }){
  const dir = params.locale === "ar" ? "rtl" : "ltr";
  const id = params.subjectid;
  const [subject, setSubject] = React.useState({});
  const [user, setUser] = React.useState({});

  React.useEffect(async () => {
    const res = await axios.get(`/api/subjects/${id}`);
    try {
      if (res.status === 200) {
        setSubject(res.data.subject);
        setUser(res.data.user);
      } else {
        console.log("something happend")
      }
    } catch (error) {
      console.log(error)
    }
  },[])
  
    return (
        <>
        <Header />
        <main className="flex flex-col min-h-screen min-w-screen justify-start items-center pt-36 pb-16 lg:items-center lg:content-center main-bg ">
        <div className="card bg-neutral w-[95%] lg:w-[800px] shadow-2xl">
          {subject.image.src === undefined ? (<figure className="h-[200px] w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>) : (<></>)}
            
            <div className="card-body flex flex-col gap-3 p-4 lg:p-8">
              <div className="profile flex flex-row justify-between items-center">
                <div className="flex flex-row gap-3 justify-start content-center items-center">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <div className="text">
                    <p className="text-">{user.name}</p>
                    <p className="opacity-50">2024/08/26 08:46 PM</p>
                  </div>
                </div>
                <details className={`dropdown ${dir === "rtl" ? "dropdown-start" : "dropdown-end"} `}>
                  <summary className="btn btn-square btn-ghost hover:bg-white/15"><FontAwesomeIcon icon={faEllipsisVertical} /></summary>
                  <ul className="menu dropdown-content bg-neutral-800 rounded-box z-[1] w-52 p-2 shadow">
                    <li><button>Edit</button></li>
                    <li><button>Delete</button></li>
                  </ul>
                </details>
                
              </div>
              <div className="p-4 lg:p-8">
                  <p className="text-3xl mb-3">{}</p>
                  <p className="text-md">{subject.description}</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        </>
    )
}