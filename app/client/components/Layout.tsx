import React, { PropsWithChildren, useContext } from "react";

import { Context } from "@reactivated";
import { Helmet } from "react-helmet-async";
import { Navbar } from "./navbar/Navbar";

export const Layout = ({ children }: PropsWithChildren) => {
  const context = useContext(Context);

  return (
    <>
      <Helmet>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Zimowy Obóz Studentów Informatyki A</title>
        <link
          rel="icon"
          href={`${context.STATIC_URL}imgs/favicon-16x16.png`}
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href={`${context.STATIC_URL}imgs/favicon-32x32.png`}
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href={`${context.STATIC_URL}imgs/favicon-96x96.png`}
          sizes="96x96"
          type="image/png"
        />
      </Helmet>
      <Navbar />
      <header>
        <h1 className="blue-color">Witaj na ZOSI! {}</h1>
      </header>
      <main>{children}</main>
      <footer>This is the footer of template {context.template_name}</footer>
    </>
  );
};
