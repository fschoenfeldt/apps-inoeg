import "@fontsource/ibm-plex-sans/latin.css";
import { UserApi, UserApiMock } from "@kiebitz-oss/api";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { de, en } from "make-plural/plurals";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../../../../app.css";
import { Layout } from "../components/Layout";
import { loadLocale } from "../components/useI18n";
import { messages } from "../locales/de/messages";
import { UserApiProvider } from "./UserApiContext";

i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

i18n.load("de", messages);
i18n.activate("de");

const api =
  process.env.NEXT_PUBLIC_MOCK_BACKEND === "1"
    ? new UserApiMock()
    : new UserApi(
        process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT!,
        process.env.NEXT_PUBLIC_STORAGE_ENDPOINT!
      );

const App = ({ Component, pageProps }: AppProps) => {
  const locale = i18n.locale;

  useEffect(() => {
    if (locale !== i18n.locale) {
      loadLocale(i18n, locale);
    }
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      <UserApiProvider api={api}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserApiProvider>
    </I18nProvider>
  );
};

export default App;
