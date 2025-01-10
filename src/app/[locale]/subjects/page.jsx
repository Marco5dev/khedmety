import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubjectsList from "@/components/SubjectsList";

export default async function Subjects(props) {
  const params = await props.params;
  const dir = params.locale === "ar" ? "rtl" : "ltr";

  return (
    <>
      <Header locale={params.locale} />
      <main className="flex flex-col min-h-screen justify-start items-center main-bg pt-36">
        <div className="text-3xl justify-start items-center">
          <h2 className="text-2xl font-bold uppercase">Subjects</h2>
        </div>
        <SubjectsList dir={dir} />
      </main>
      <Footer />
    </>
  );
}
