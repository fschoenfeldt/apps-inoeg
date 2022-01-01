import "@fontsource/ibm-plex-sans/latin.css";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { RouterContext } from "next/dist/shared/lib/router-context";
import "../../../app.css";

i18n.activate("de");

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  actions: { argTypesRegex: "^on.*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [
  (Story) => (
    <I18nProvider i18n={i18n}>
      <Story />
    </I18nProvider>
  ),
];
