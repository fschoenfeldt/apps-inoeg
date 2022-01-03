import { Login16, Logout16 } from "@carbon/icons-react";
import { useEffect, useState } from "react";
import { useProviderApi } from "../pages/ProviderApiContext";
import { Link } from "./Link";

export const Nav: React.FC = () => {
  const api = useProviderApi();
  const [isAuthed, setAuthed] = useState<boolean>(false);

  useEffect(() => {
    api.isAuthenticated().then((result) => {
      setAuthed(result);
    });
  }, [api]);

  return (
    <nav>
      <ul className="flex gap-8">
        <li>
          <Link href="/schedule">Terminplan</Link>
        </li>
        <li>
          <Link href="/settings">Einstellungen</Link>
        </li>
        <li className="ml-8">
          {isAuthed ? (
            <Link href="/logout">
              <Logout16 />
              Abmelden
            </Link>
          ) : (
            <Link href="/onboarding">
              <Login16 />
              Anmelden
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
