import { ProviderApiAdapter } from "@kiebitz-oss/api";
import { createContext, useContext } from "react";

interface ProviderApiContext {
  api: ProviderApiAdapter;
}

const ProviderApiContext = createContext<ProviderApiContext | undefined>(
  undefined
);

export const ProviderApiProvider: React.FC<{ api: ProviderApiAdapter }> = ({
  children,
  api,
}) => {
  return (
    <ProviderApiContext.Provider value={{ api }}>
      {children}
    </ProviderApiContext.Provider>
  );
};

export const useProviderApi = () => {
  const context = useContext(ProviderApiContext);

  if (context === undefined) {
    throw new Error("You cant use useProviderApi without ProviderApiProvider!");
  }

  return context.api;
};
