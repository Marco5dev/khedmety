"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Apple from "@/svg/apple";
import Google from "@/svg/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import {
  faAt,
  faLock,
  faSignature,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Form() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "login";
  const [formType, setFormType] = useState("login");
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Error, setError] = useState("")

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    // Regular expression to match spaces and uppercase letters
    const regex = /^[a-z0-9]*$/;

    if (regex.test(value)) {
      setUsername(value);
      setError('');
    } else {
      setError('Username cannot contain spaces or uppercase letters.');
    }
  };

  const handleRegisteration = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/register", {
      username,
      name,
      email,
      password,
    });
    console.log(response.data);
    if (response.status === 200) {
      alert("Registration complate!");
    }
    alert("Registration Failed!");
  };

  useEffect(() => {
    if (type && type !== formType) {
      setIsAnimating(true);
      setTimeout(() => {
        setFormType(type);
        setIsAnimating(false);
      }, 300);
    }
  }, [type, formType]);

  return (
    <div className="flex justify-center items-start lg:items-center w-screen h-screen mt-10 lg:mt-0">
      <div className="w-full max-w-md">
        <h1 className="text-xl lg:text-2xl font-bold text-center mb-8 uppercase">
          {formType === "register" ? t("register") : t("login")}
        </h1>
        <div
          className={`transition-all duration-300 justify-center content-center items-center flex transform ${
            isAnimating
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          {formType === "register" ? (
            <div className="login-container shadow-2xl w-[95%] lg:w-[450px]">
              <form className="login-form" onSubmit={handleRegisteration}>
                <div className="login-flex-column">
                  <label>{t("the-name")}</label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-[20px] h-[20px]"
                  />
                  <input
                    type="text"
                    required
                    className="login-input"
                    placeholder={t("enter-your-full-name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="login-flex-column">
                  <label>{t("username")}</label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon
                    icon={faSignature}
                    className="w-[20px] h-[20px]"
                  />
                  <input
                    type="username"
                    required
                    className="login-input"
                    placeholder={t("enter-your-username")}
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="login-flex-column">
                  <label>{t("email")}</label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon icon={faAt} className="w-[20px] h-[20px]" />
                  <input
                    type="email"
                    required
                    className="login-input"
                    placeholder={t("enter-your-email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="login-flex-column">
                  <label>{t("password")}</label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="w-[20px] h-[20px]"
                  />
                  <input
                    type="password"
                    required
                    className="login-input"
                    placeholder={t("enter-your-password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="login-button-submit" type="submit">{t("register")}</button>
              </form>
              <p className="login-p">{t("or-with")}</p>
              <div className="login-flex-col">
                <button className="login-btn google">
                  <Google />
                  Google
                </button>
                <button className="login-btn apple">
                  <Apple />
                  Apple
                </button>
                <button className="login-btn facebook">
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="w-[20px] h-[20px] text-blue-600"
                  />
                  Facebook
                </button>
              </div>
              <p className="login-p">
                {t("already-have-an-account")}{" "}
                <Link href="/login?type=login" className="btn btn-link">
                  {t("login")}
                </Link>
              </p>
            </div>
          ) : (
            <div className="login-container shadow-2xl w-[95%] lg:w-[450px]">
              <form className="login-form">
                <div className="login-flex-column">
                  <label>{t("email")}</label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon icon={faAt} className="w-[20px] h-[20px]" />
                  <input
                    type="email"
                    required
                    className="login-input"
                    placeholder={t("enter-your-email")}
                  />
                </div>
                <div className="login-flex-column">
                  <label>{t("password")}</label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="w-[20px] h-[20px]"
                  />
                  <input
                    type="password"
                    className="login-input"
                    placeholder={t("enter-your-password")}
                  />
                </div>
                <div className="login-flex-row">
                  <div className="content-center items-center flex flex-row gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    <label>{t("remember-me")}</label>
                  </div>
                  <span className="login-span">{t("forgot-password")}</span>
                </div>
                <button className="login-button-submit">{t("login")}</button>
              </form>
              <p className="login-p">{t("or-with")}</p>
              <div className="login-flex-col">
                <button className="login-btn google">
                  <Google />
                  Google
                </button>
                <button className="login-btn apple">
                  <Apple />
                  Apple
                </button>
                <button className="login-btn facebook">
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="w-[20px] h-[20px] text-blue-600"
                  />
                  Facebook
                </button>
              </div>
              <p className="login-p">
                {t("dont-have-an-account")}{" "}
                <Link href="/login?type=register" className="btn btn-link">
                  {t("register")}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
