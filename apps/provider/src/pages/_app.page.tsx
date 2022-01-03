import "@fontsource/ibm-plex-sans/latin.css";
import { ProviderApi, ProviderApiMock } from "@kiebitz-oss/api";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { de, en } from "make-plural/plurals";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../../../../app.css";
import { Layout } from "../components/Layout";
import { loadLocale } from "../components/useI18n";
import "../provider.css";
import { ProviderApiProvider } from "./ProviderApiContext";

i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

loadLocale(i18n, "de");

const api =
  process.env.NEXT_PUBLIC_MOCK_BACKEND === "1"
    ? new ProviderApiMock()
    : new ProviderApi(
        process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT!,
        process.env.NEXT_PUBLIC_STORAGE_ENDPOINT!
      );

const App = ({ Component, pageProps }: AppProps) => {
  const locale = i18n.locale;

  useEffect(() => {
    if (locale) {
      loadLocale(i18n, locale);
    }
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      <ProviderApiProvider api={api}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProviderApiProvider>
    </I18nProvider>
  );
};

export default App;
