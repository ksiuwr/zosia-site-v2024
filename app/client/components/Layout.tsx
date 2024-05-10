import React from "react";

import { Context } from "@reactivated";
import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Layout = (props: Props) => {
  const context = React.useContext(Context);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href={`${context.STATIC_URL}favicon.ico`}
          type="image/x-icon"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${context.STATIC_URL}admin/css/fonts.css`}
        />
      </Helmet>
      <header>
        <a href="/" rel="noopener">
          django reactivated
        </a>
        <p>This is URL {context.STATIC_URL}</p>
      </header>
      <main>{props.children}</main>
      <footer>This is the footer of template {context.template_name}</footer>
    </>
  );
};
