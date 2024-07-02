import { Context } from "@reactivated";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { CustomToast } from "./CustomToast";
import { Footer } from "./Footer";
import { Navbar } from "./navbar/Navbar";

export const Layout = ({ children }: PropsWithChildren) => {
  const context = useContext(Context);
  const messages = context.messages;

  useEffect(() => {
    while (messages.length > 0) {
      const message = messages.pop();

      if (message) {
        toast.custom((t) => (
          <CustomToast
            isToastVisible={t.visible}
            levelTag={message.level_tag}
            message={message.message}
          />
        ));
      }
    }
  }, [messages]);

  return (
    <>
      <Helmet>
        <html data-theme="light" />
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
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
      <Toaster position="top-center" />
      <div className="flex h-dvh flex-col">
        <Navbar />
        <main className="grow bg-base-100">{children}</main>
        <Footer />
      </div>
    </>
  );
};
