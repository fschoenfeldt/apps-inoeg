import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { act, getByText, render } from "@testing-library/react";
import { axe } from "jest-axe";
import { de, en } from "make-plural/plurals";
import { messages as deMessages } from "../locales/de/messages";
import { messages as enMessages } from "../locales/en/messages";
import IndexPage from "./index.page";

i18n.load("de", deMessages);
i18n.load("en", enMessages);

i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

const TestingProvider: React.FC = ({ children }) => (
  <I18nProvider i18n={i18n}>{children}</I18nProvider>
);

describe("IndexPage", () => {
  it("should be translated correctly in German", async () => {
    act(() => {
      i18n.activate("de");
    });

    const { getByTestId, container } = render(
      <TestingProvider>
        <IndexPage />
      </TestingProvider>,
      {
        wrapper: TestingProvider,
      }
    );

    expect(getByTestId("view.title")).toBeInTheDocument();
    expect(getByText(container, "Willkommen!")).toBeDefined();
  });

  it("should be translated correctly in English", async () => {
    act(() => {
      i18n.activate("en");
    });

    const { getByTestId, container } = render(
      <TestingProvider>
        <IndexPage />
      </TestingProvider>,
      {
        wrapper: TestingProvider,
      }
    );

    expect(getByTestId("view.title")).toBeInTheDocument();
    expect(getByText(container, "Welcome!")).toBeDefined();
  });

  it("should not have a11y violations", async () => {
    // pass anything that outputs html to axe
    const { container } = render(
      <TestingProvider>
        <IndexPage />
      </TestingProvider>,
      {
        wrapper: TestingProvider,
      }
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
