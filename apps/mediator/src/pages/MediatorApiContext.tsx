import { MediatorApiAdapter } from "@kiebitz-oss/api";
import { createContext, useContext } from "react";

interface MediatorApiContext {
  api: MediatorApiAdapter;
}

const MediatorApiContext = createContext<MediatorApiContext | undefined>(
  undefined
);

export const MediatorApiProvider: React.FC<{ api: MediatorApiAdapter }> = ({
  children,
  api,
}) => {
  return (
    <MediatorApiContext.Provider value={{ api }}>
      {children}
    </MediatorApiContext.Provider>
  );
};

export const useMediatorApi = () => {
  const context = useContext(MediatorApiContext);

  if (context === undefined) {
    throw new Error("You cant use useMediatorApi without MediatorApiProvider!");
  }

  return context.api;
};
