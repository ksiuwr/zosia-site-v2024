import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { Context, reverse } from "@reactivated";
import React, { useContext } from "react";
import { DesktopMenu } from "./desktop/DesktopMenu";
import { MobileMenu } from "./mobile/MobileMenu";

export const Navbar = () => {
  const context = useContext(Context);

  return (
    <nav className="w-full bg-base-300 py-2">
      <CenteredContainer>
        <div className="relative flex h-full items-center justify-center align-middle lg:justify-between">
          <MobileMenu />
          <a href={reverse("index")} className="flex flex-col justify-center">
            <img
              src={`${context.STATIC_URL}imgs/zosia.svg`}
              alt="ZOSIA"
              className="h-10 lg:h-12"
            />
          </a>
          <DesktopMenu />
        </div>
      </CenteredContainer>
    </nav>
  );
};
