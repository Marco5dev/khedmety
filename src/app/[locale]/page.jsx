import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import initTranslations from "@/i18n.js";
import Link from "next/link";
const i18nNamespaces = ['home'];

export default async function Home({ params }) {
  const { t } = await initTranslations(params.locale, i18nNamespaces);
  return (
    <>
      <Header locale={params.locale} />
      <main className="flex flex-col min-h-screen contetnt-center justify-center items-center main-bg">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md justify-center content-center items-center flex flex-col gap-2">
              <Image
                src={"/logo-transparent.png"}
                alt={"logo"}
                width={150}
                height={150}
              />
              <h1 className="text-5xl font-bold">{t("khedmety")}</h1>
              <p className="py-6">{t("description")}</p>
              <Link href="/subjects" className="btn btn-primary min-w-[95%] lg:min-w-36">{t("subjects")}</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
