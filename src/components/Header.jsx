import initTranslations from "@/i18n.js";
import TranslationsProvider from "@/components/TranslationsProvider";
import Menu from "./Menu"
const i18nNamespaces = ["common"];

export default async function Header({ locale }) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Menu locale={locale} />
    </TranslationsProvider>
  );
}
