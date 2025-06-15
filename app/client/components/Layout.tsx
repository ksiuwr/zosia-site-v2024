import { ThemeProvider } from "@client/utils/themes/ThemeContext";
import { themeInitScript } from "@client/utils/themes/themes";
import { Context } from "@reactivated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import parse from "html-react-parser";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { AdminNavBar } from "./admin/AdminNavBar";
import { showCustomToast } from "./CustomToast";
import { Footer } from "./Footer";
import { Navbar } from "./navbar/Navbar";

interface LayoutProps {
  showAdminSidebar?: boolean;
}

export const Layout = ({
  showAdminSidebar,
  children,
}: PropsWithChildren<LayoutProps>) => {
  const { messages, STATIC_URL } = useContext(Context);

  // React query docs recommend keeping the query client in React state
  // for server side rendering.
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    while (messages.length > 0) {
      const message = messages.pop();

      if (message) {
        showCustomToast(message.level_tag, parse(message.message));
      }
    }
  }, [messages]);

  return (
    <>
      <Helmet>
        <html />
        <script>{themeInitScript}</script>
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>LEtni Obóz Studentów Informatyki</title>
        <link
          rel="icon"
          href={`${STATIC_URL}imgs/favicon-16x16.png`}
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href={`${STATIC_URL}imgs/favicon-32x32.png`}
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href={`${STATIC_URL}imgs/favicon-96x96.png`}
          sizes="96x96"
          type="image/png"
        />
      </Helmet>
      <Toaster position="top-center" />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {showAdminSidebar && (
            <div className="fixed hidden h-screen w-80 overflow-scroll lg:block">
              <AdminNavBar showAsSidebar />
            </div>
          )}

          <div
            className={clsx(
              "flex h-dvh flex-col",
              showAdminSidebar && "lg:ml-80",
            )}
          >
            <Navbar adminSidebarShown={showAdminSidebar} />
            <main className="grow bg-base-100">{children}</main>
            <Footer adminSidebarShown={showAdminSidebar} />
          </div>

          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};
