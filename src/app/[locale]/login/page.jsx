import initTranslations from "@/i18n.js";
import Form from "./form";
import TranslationsProvider from "@/components/TranslationsProvider";
const i18nNamespaces = ["login"];

export default async function Login({ params }) {
  const { resources } = await initTranslations(
    params.locale,
    i18nNamespaces
  );

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}
    >
      <main className="flex min-h-screen min-w-screen justify-center items-start content-start lg:items-center lg:content-center login-form bg-gradient-main">
        <Form />
      </main>
    </TranslationsProvider>
  );
}
