import { Login16, Logout16 } from "@carbon/icons-react";
import { theme } from "@kiebitz-oss/config";
import { useEffect, useState } from "react";
import logoUrl from "../../public/assets/ffm-logo.svg";
import { useMediatorApi } from "../pages/MediatorApiContext";
import { Link } from "./Link";

export interface HeaderProps extends React.ComponentProps<"header"> {}

export const Header: React.FC<HeaderProps> = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const api = useMediatorApi();

  useEffect(() => {
    api.isAuthenticated().then((isAuthenticated) => {
      setAuthenticated(isAuthenticated);
    });
  }, [api]);

  return (
    <header className="flex justify-between items-center px-8 min-w-full min-h-[86px] md:px-12 md:min-h-[100px]">
      <h1>
        <Link href="/">
          <img src={logoUrl.src} alt={theme.logoAlt} />
        </Link>
      </h1>

      <nav>
        <ul className="flex gap-8">
          <li>
            <Link href="/providers" className="hover">
              Impfanbieter
            </Link>
          </li>
          <li>
            <Link href="/settings" className="hover">
              Einstellungen
            </Link>
          </li>
          <li className="ml-8">
            {authenticated ? (
              <Link href="/logout" className="hover">
                <Logout16 />
                Abmelden
              </Link>
            ) : (
              <Link href="/" className="hover">
                <Login16 />
                Anmelden
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
