import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileForm from "./profileForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

export const revalidate = 0; // Disable caching for this page

export default async function Profile(props) {
  const params = await props.params;
  const dir = params.locale === "ar" ? "rtl" : "ltr";
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?type=login");
  }

  // Ensure we have all required user data
  const userData = {
    name: session.user.name || "",
    email: session.user.email || "",
    bio: session.user.bio || "",
    role: session.user.role || "user",
    avatar: session.user.avatar || null,
  };

  return (
    <>
      <Header locale={params.locale} />
      <main className="flex flex-col min-h-screen justify-start items-center main-bg pt-36">
        <div className="w-full max-w-4xl px-4">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          <ProfileForm user={userData} dir={dir} />
        </div>
      </main>
      <Footer />
    </>
  );
}
