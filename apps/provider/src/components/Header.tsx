import { theme } from "@kiebitz-oss/config";
import logoUrl from "../../public/assets/ffm-logo.svg";
import { Link } from "./Link";
import { Nav } from "./Nav";

export interface HeaderProps extends React.ComponentProps<"header"> {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex justify-between items-center px-8 min-w-full min-h-[86px] md:px-12 md:min-h-[100px]">
      <h1>
        <Link href="/">
          <img src={logoUrl.src} alt={theme.logoAlt} />
        </Link>
      </h1>

      <Nav />
    </header>
  );
};
