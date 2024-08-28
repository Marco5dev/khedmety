"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function Form({ params }) {
  const router = useRouter();
  const session = useSession()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const dir = params.locale === "ar" ? "rtl" : "ltr";

  const handleRegisteration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/subjects", {
        title,
        description
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

  const goBack = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <>
    {
      dir === "ltr" ? (    <button onClick={goBack} className="btn btn-ghost fixed top-0 left-0 btn-square rounded-full mt-2 ml-2">
        <FontAwesomeIcon icon={faArrowLeft} />
       </button>) : (
            <button onClick={goBack} className="btn btn-ghost fixed top-0 right-0 btn-square rounded-full mt-2 ml-2">
            <FontAwesomeIcon icon={faArrowRight} />
           </button>
       )
    }

    <main className="flex justify-center items-start lg:items-center w-full h-screen main-bg mt-10 lg:mt-0">
      <div className="w-full max-w-md">
        <h1 className="text-xl lg:text-2xl font-bold text-center mb-8 uppercase">
          New Subject
        </h1>
            <div className="login-container shadow-2xl w-[95%] lg:w-[450px]">
              <form className="login-form" onSubmit={handleRegisteration}>
                <div className="login-flex-column">
                  <label>Title</label>
                </div>
                <div className="login-inputForm">
                  <input
                    type="text"
                    required
                    className="login-input"
                    placeholder={"Enter the Title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="login-flex-column">
                  <label>Description</label>
                </div>
                  <textarea className="textarea textarea-bordered bg-[#2b2b2b]" 
                    required
                    placeholder={"Enter the description"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                <button className="login-button-submit" type="submit">
                  Submit
                </button>
              </form>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
