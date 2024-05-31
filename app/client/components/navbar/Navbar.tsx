import React, { useContext } from "react";
import { reverse } from "@reactivated";
import { Context } from "@reactivated";
import { MobileMenu } from "./mobile/MobileMenu";
import { DesktopMenu } from "./desktop/DesktopMenu";

export const Navbar = () => {
  const context = useContext(Context);

  return (
    <nav className="h-20 w-full bg-slate-300">
      <div className="relative mx-auto flex h-full w-5/6 justify-center align-middle lg:w-4/6 lg:justify-between">
        <MobileMenu />
        <a href={reverse("index")} className="flex flex-col justify-center">
          <img
            src={`${context.STATIC_URL}imgs/zosia.svg`}
            alt="ZOSIA"
            className="h-12"
          />
        </a>
        <DesktopMenu />
      </div>
    </nav>
  );
};
