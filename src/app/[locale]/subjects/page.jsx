import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import initTranslations from "@/i18n.js";
const i18nNamespaces = ["common"];
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default async function Subjects({ params }) {
  const { t } = await initTranslations(params.locale, i18nNamespaces);
  const dir = params.locale === "ar" ? "rtl" : "ltr";

  return (
    <>
      <Header locale={params.locale} />
      <main className="flex flex-col min-h-screen justify-start items-center main-bg pt-36">
        <div className="text-3xl justify-start items-center">
          <h2 className="text-2xl font-bold uppercase">{t("subjects")}</h2>
        </div>
        <div className="flex flex-col justify-start items-center content-center mt-10">
          <div className="card bg-neutral w-[95%] lg:w-[600px] shadow-2xl">
            <figure className="h-[100px]">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body flex flex-col gap-3 p-4 lg:p-8">
              <div className="profile flex flex-row justify-between items-center">
                <div className="flex flex-row gap-3 justify-start content-center items-center">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <div className="text">
                    <p className="text-">Mark Maher</p>
                    <p className="opacity-50">2024/08/26 08:46 PM</p>
                  </div>
                </div>
                <details className={`dropdown ${dir === "rtl" ? "dropdown-start" : "dropdown-end"} `}>
                  <summary className="btn btn-square btn-ghost hover:bg-white/15"><FontAwesomeIcon icon={faEllipsisVertical} /></summary>
                  <ul className="menu dropdown-content bg-neutral rounded-box z-[1] w-52 p-2 shadow">
                    <li><button>Edit</button></li>
                    <li><button>Delete</button></li>
                  </ul>
                </details>
              </div>
              <div className="p-4 lg:p-8">
                <Link href="/subject/:id">
                  <p className="">Title</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
