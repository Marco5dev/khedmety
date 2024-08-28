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
  faEyeLowVision,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function Form() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "login";
  const [formType, setFormType] = useState("login");
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [email, setEmail] = useState("");
  const [Error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const session = useSession()

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    // Regular expression to match spaces and uppercase letters
    const regex = /^[a-z0-9]*$/;

    if (regex.test(value)) {
      setUsername(value);
      setError("");
    } else {
      setError("Username cannot contain spaces or uppercase letters.");
    }
  };

  function evaluatePasswordStrength(password) {
    let score = 0;

    if (!password) return "";

    // Check password length
    if (password.length > 8) score += 1;
    // Contains lowercase
    if (/[a-z]/.test(password)) score += 1;
    // Contains uppercase
    if (/[A-Z]/.test(password)) score += 1;
    // Contains numbers
    if (/\d/.test(password)) score += 1;
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
      case 5:
        return "Strong";
    }
  }

  const handleRegisteration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/register", {
        username,
        name,
        email,
        password,
      });

      if (response.status === 201) {
        alert(response.data.message);
        return router.push("/login?type=login");
      } else if (response.status === 409) {
        if(response.data.errorEmail) setErrorEmail(response.data.errorEmail);
        if(response.data.errorUsername) setErrorUsername(response.data.errorUsername);
        
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Handle Axios errors
        if (error.response.status === 401) {
          alert(error.response.data.message);
          setError(error.response.data.message);
        } else if (error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          alert("An unexpected error occurred.");
        }
      } else {
        // Handle errors not related to the response, such as network issues
        console.error("Error:", error.message);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  
    if (res.error) {
      console.log(res)
      setError(res.error);
    } else {
      return router.push("/");
    }
  };
  
  useEffect(()=>{
    if(session?.status === "authenticated") {
      router.replace("/")
    }
  },[session, router])

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
                <div className="flex-row flex max-w-[95%]">
                <p>{errorUsername}</p>
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
                <div className="flex-row flex max-w-[95%]">
                <p>{errorEmail}</p>
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
                    type={isPasswordVisible ? "text" : "password"}
                    required
                    className="login-input"
                    placeholder={t("enter-your-password")}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setStrength(evaluatePasswordStrength(e.target.value));
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-square btn-ghost rounded-2xl text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <FontAwesomeIcon
                        icon={faEyeLowVision}
                        className="w-5 h-5"
                      /> // Optional: Eye icon for hidden state
                    ) : (
                      <FontAwesomeIcon icon={faEye} className="w-5 h-5" /> // Optional: Eye icon for visible state
                    )}
                  </button>
                </div>
                <div className="flex-row flex gap-2">
                Password strength: <p
                      className={`${
                        strength === "Weak"
                          ? "text-red-500"
                          : strength === "Medium"
                          ? "text-orange-500"
                          : strength === "Strong"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                       {strength || "Unknown"}
                    </p>
                  </div>
                  <p className="text-red-500">{Error}</p>
                <button className="login-button-submit" type="submit">
                  {t("register")}
                </button>
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
              <form className="login-form" onSubmit={handleLogin}>
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
                    type={isPasswordVisible ? "text" : "password"}
                    required
                    className="login-input"
                    placeholder={t("enter-your-password")}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-square btn-ghost rounded-2xl text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <FontAwesomeIcon
                        icon={faEyeLowVision}
                        className="w-5 h-5"
                      /> // Optional: Eye icon for hidden state
                    ) : (
                      <FontAwesomeIcon icon={faEye} className="w-5 h-5" /> // Optional: Eye icon for visible state
                    )}
                  </button>
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
                <button className="login-button-submit" type="submit">{t("login")}</button>
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
