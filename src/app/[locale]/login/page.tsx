"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Apple from "@/svg/apple";
import Google from "@/svg/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { faAt, faLock, faSignature } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

export default function Login() {
  const searchParams = useSearchParams(); 
  const type = searchParams.get('type') || 'login';
  const [formType, setFormType] = useState<string>('login');
  const [isAnimating, setIsAnimating] = useState(false);
  const t = useTranslations("login");

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
    <main className="flex min-h-screen min-w-screen justify-center items-center content-center login-form bg-gradient-main">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-8 uppercase">
            {formType === "register" ? t("register") : t("login")}
          </h1>
          <div
            className={`transition-all duration-300 transform ${
              isAnimating
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            {formType === "register" ? (
              <form className="login-form shadow-2xl">
                <div className="login-flex-column">
                  <label>Name </label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon icon={faSignature} className="w-[20px] h-[20px]" />
                  <input
                    type="text"
                    required
                    className="login-input"
                    placeholder="Enter your Full Name"
                  />
                </div>
                <div className="login-flex-column">
                  <label>Email </label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon icon={faAt} className="w-[20px] h-[20px]" />
                  <input
                    type="email"
                    required
                    className="login-input"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="login-flex-column">
                  <label>Password </label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="w-[20px] h-[20px]"
                  />
                  <input
                    type="password"
                    className="login-input"
                    placeholder="Enter your Password"
                  />
                </div>
                <button className="login-button-submit">{"Register"}</button>
                <p className="login-p">
                  Already have an account?{" "}
                  <Link href="/login?type=login" className="btn btn-link">
                  {"Login"}
                  </Link>
                </p>
                <p className="login-p">Or With</p>
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
              </form>
            ) : (
              <form className="login-form shadow-2xl">
                <div className="login-flex-column">
                  <label>Email </label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon icon={faAt} className="w-[20px] h-[20px]" />
                  <input
                    type="email"
                    required
                    className="login-input"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="login-flex-column">
                  <label>Password </label>
                </div>
                <div className="login-inputForm">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="w-[20px] h-[20px]"
                  />
                  <input
                    type="password"
                    className="login-input"
                    placeholder="Enter your Password"
                  />
                </div>
                <div className="login-flex-row">
                  <div className="content-center items-center flex flex-row gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    <label>Remember me </label>
                  </div>
                  <span className="login-span">Forgot password?</span>
                </div>
                <button className="login-button-submit">Login</button>
                <p className="login-p">
                  Don't have an account?{" "}
                  <Link href="/login?type=register" className="btn btn-link">
                    Register
                  </Link>
                </p>
                <p className="login-p">Or With</p>
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
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
