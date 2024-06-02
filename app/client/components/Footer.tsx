import React, { useContext } from "react";
import { Context, reverse } from "@reactivated";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export const Footer = () => {
  const context = useContext(Context);

  const serverTime = new Date(context.server_time);

  return (
    <footer className="w-full bg-neutral py-5 text-neutral-content">
      <div className="mx-auto w-5/6 lg:w-4/6">
        <div className="footer max-lg:footer-center max-lg:gap-6 lg:justify-between">
          <aside>
            <h6 className="footer-title">Koło Studentów Informatyki</h6>
            <p>
              Room 24A
              <br />
              Fryderyka Joliot-Curie 15
              <br />
              51-137 Wrocław
              <br />
              <a
                className="link-hover link"
                href="mailto:ksi@cs.uni.wroc.pl"
                target="_blank"
              >
                <EnvelopeIcon className="mr-1 inline size-5" />
                ksi@cs.uni.wroc.pl
              </a>
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Info</h6>
            <a
              className="link-hover link"
              href={reverse("terms_and_conditions")}
            >
              Terms and Conditions
            </a>
            <a className="link-hover link" href={reverse("privacy_policy")}>
              Privacy policy
            </a>
            <a className="link-hover link" href={reverse("questions_index")}>
              Q&A
            </a>
          </nav>
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="flex justify-between gap-2">
              <a
                className="link text-neutral-content hover:mix-blend-difference"
                href="https://www.facebook.com/ZOSIA.KSI"
                target="_blank"
              >
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                className="link text-neutral-content hover:mix-blend-difference"
                href="https://github.com/ksiuwr"
                target="_blank"
              >
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </nav>
        </div>
        <div className="footer mt-8 max-lg:footer-center max-lg:gap-3 lg:justify-between">
          <aside className="lg:justify-self-end">
            <p className="text-right text-xs">
              Server time: {serverTime.toUTCString()}
            </p>
          </aside>
          <aside>
            <p className="text-xs">
              © 2016-{serverTime.getUTCFullYear()}, Koło Studentów Informatyki
            </p>
          </aside>
        </div>
      </div>
    </footer>
  );
};
