"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import LanguageChanger from "./LanguageChanger"

export default function Menu({ locale }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <>
      <header className="flex fixed min-w-[95%] h-17 z-10 justify-between items-center p-4 top-0 right-0 left-0 m-1 md:m-3 max-w-[100%] lg:m-5 shadow-2xl bg-natural">
        <Link href={"/"} className="text-2xl font-bold uppercase btn btn-ghost">
          {t("khedmety")}
        </Link>

        <nav className="hidden lg:flex lg:flex-row gap-2">
          <Link href="/subjects" className="btn btn-ghost">{t("subjects")}</Link>
          <LanguageChanger />

          <label className="input input-bordered bg-neutral flex items-center gap-2">
            <input type="text" className="grow" placeholder={t("search")} />
            <kbd className="kbd kbd-sm w-fit bg-neutral-600">⌘</kbd> {"/"}
            <kbd className="kbd kbd-sm w-fit bg-neutral-600">ctrl</kbd> {"+"}
            <kbd className="kbd kbd-sm bg-neutral-600">K</kbd>
          </label>
          <Link href={"/login?type=register"} className="btn btn-secondary">
            {t("register")}
          </Link>
          <Link className="btn btn-primary" href="/login?type=login">
            {t("login")}
          </Link>
        </nav>

        <button
          onClick={toggleMenu}
          className="btn btn-square btn-ghost lg:hidden"
        >
          <FontAwesomeIcon icon={faBars} className="w-[25px] h-[25px]" />
        </button>
      </header>

      <div
        className={`fixed top-0 right-0 h-full bg-neutral/25 backdrop-blur-3xl w-[100%] transition-transform duration-300 ease-in-out ${
          dir === "ltr"
            ? menuOpen
              ? "translate-x-0"
              : "translate-x-full"
            : menuOpen
            ? "-translate-x-0"
            : "-translate-x-full"
        } lg:hidden bg-natural z-20`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex flex-row justify-between mb-2 items-center content-center">
            <div className="flex flex-row gap-1">
              <Link className="btn btn-primary" href="/login?type=login">
                {t("login")}
              </Link>
              <Link href={"/login?type=register"} className="btn btn-secondary">
                {t("register")}
              </Link>
              <LanguageChanger />
            </div>
            <div className="flex flex-row gap-3">
              <button onClick={toggleMenu} className="btn btn-ghost btn-square">
                <FontAwesomeIcon icon={faXmark} className="w-[25px] h-[25px]" />
              </button>
            </div>
          </div>

          <nav className="flex flex-col flex-grow">
            <label className="input input-bordered bg-neutral flex items-center gap-2">
              <input type="text" className="grow" placeholder={t("search")} />
              <kbd className="kbd kbd-sm bg-neutral-600">⌘</kbd>
              <kbd className="kbd kbd-sm bg-neutral-600">K</kbd>
            </label>

            <div>
              <ul className="menu w-[100%]">
                <li>
                  <Link href="/subjects">{t("subjects")}</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
