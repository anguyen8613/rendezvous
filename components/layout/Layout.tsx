import MainNavigation from "./MainNavigation";
import { ReactNode } from "react";
import classes from "./Layout.module.css";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default Layout;
