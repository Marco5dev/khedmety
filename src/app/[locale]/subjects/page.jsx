"use client";  // Keeping this as a client-side component

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import initTranslations from "@/i18n.js";
const i18nNamespaces = ["common"];
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default function Subjects({ params }) {
  const dir = params.locale === "ar" ? "rtl" : "ltr";
  const [data, setData] = React.useState([]);

  // React.useEffect(() => {
    
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("/api/subjects");
  //       console.log("getting data", res)
  
  //       if (res.status === 200) {
  //         setData(res.data.subjects);
  //       } else if (res.status === 404) {
  //         console.log("Data not found: ", res.data.message);
  //       } else {
  //         console.error("Unexpected response status:", res.status, res.data);
  //       }
  //     } catch (err) {
  //       console.error("Fetch data error:", err.response ? err.response.data : err.message);
  //     }
  //   };
  
  //   fetchData();
  // }, []); // Ensure the dependency array is correct to avoid infinite loops

  
  React.useEffect(()=>{
    const fetchData = async () => {
      const res = await axios.get("/api/subjects");
      try {
        console.log("getting data", res)
  
        if (res.status === 200) {
          setData(res.data.subjects);
        } else if (res.status === 404) {
          console.log("Data not found: ", res.data.message);
        } else {
          console.error("Unexpected response status:", res.status, res.data);
        }
      } catch (err) {
        console.error("Fetch data error:", err.response ? err.response.data : err.message);
      }
    }
    fetchData();
  },[])

  return (
    <>
      <Header locale={params.locale} />
      <main className="flex flex-col min-h-screen justify-start items-center main-bg pt-36">
        <div className="text-3xl justify-start items-center">
          <h2 className="text-2xl font-bold uppercase">Subjects</h2>
        </div>
        <div className="flex flex-col justify-start items-center content-center mt-10">
          {data.map((item) => (
            <div key={item._id} className="card bg-neutral w-[95%] lg:w-[600px] shadow-2xl">
              <div className="card-body flex flex-col gap-3 p-4 lg:p-8">
                <div className="profile flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-3 justify-start content-center items-center">
                    <div className="avatar">
                      <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="text">
                      <p className="text-lg">{item.title}</p>
                      <p className="opacity-50">{new Date(item.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <details className={`dropdown ${dir === "rtl" ? "dropdown-start" : "dropdown-end"} `}>
                    <summary className="btn btn-square btn-ghost hover:bg-white/15">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </summary>
                    <ul className="menu dropdown-content bg-neutral rounded-box z-[1] w-52 p-2 shadow">
                      <li><button>Edit</button></li>
                      <li><button>Delete</button></li>
                    </ul>
                  </details>
                </div>
                <div className="p-4 lg:p-8">
                  <Link href={`/subject/${item._id}`}>
                    <p className="text-lg">{item.description}</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <Link href="/subjects/new" className="btn btn-ghost btn-active rounded-full btn-square fixed bottom-0 left-0 mb-2 ml-2">
        <FontAwesomeIcon icon={faPlus} />
      </Link>
    </>
  );
}
