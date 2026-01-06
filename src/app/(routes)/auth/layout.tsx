import { ToggleTheme } from "@/app/components/theme-toggle";
import { HomeIcon } from "lucide-react";
import { Link } from "react-transition-progress/next";

type AuthPageLayoutProps = {
  children: React.ReactNode;
};

const AuthPageLayout = ({ children }: AuthPageLayoutProps) => {
  return (
    <div>
      {/* <div className="flex justify-between px-4 py-2 border-b border-border">
        <Link href="/">
          <HomeIcon className="text-muted-foreground" />
        </Link>

        <ToggleTheme/>
      </div> */}
      {children}
    </div>
  );
};

export default AuthPageLayout;
