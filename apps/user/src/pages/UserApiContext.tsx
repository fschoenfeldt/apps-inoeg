import { UserApiAdapter } from "@kiebitz-oss/api";
import { createContext, useContext } from "react";

interface UserApiContext {
  api: UserApiAdapter;
}

const UserApiContext = createContext<UserApiContext | undefined>(undefined);

export const UserApiProvider: React.FC<{ api: UserApiAdapter }> = ({
  children,
  api,
}) => {
  return (
    <UserApiContext.Provider value={{ api }}>
      {children}
    </UserApiContext.Provider>
  );
};

export const useUserApi = () => {
  const context = useContext(UserApiContext);

  if (context === undefined) {
    throw new Error("You cant use useUserApi without UserApiProvider!");
  }

  return context.api;
};
