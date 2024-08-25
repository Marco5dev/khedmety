import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
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
              <h1 className="text-5xl font-bold">Khedmety</h1>
              <p className="py-6">
                Let us reflect on the virtues of selfless love and the pursuit
                of righteousness. May we strive to embody the qualities of
                compassion, kindness, and humility, even in the face of
                adversity. As we walk in the light of faith, may we be guided by
                the principles of justice, mercy, and forgiveness, that we may
                be a beacon of hope and inspiration to those around us.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </main>
      <main className="flex flex-col min-h-screen contetnt-center justify-center items-center p-24"></main>
    </>
  );
}
