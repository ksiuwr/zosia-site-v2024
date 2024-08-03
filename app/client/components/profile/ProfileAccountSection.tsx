import { Context, reverse } from "@reactivated";
import React, { useContext } from "react";
import Markdown from "react-markdown";
import { Alert } from "../alert/Alert";

const accountInfoMarkdown = (
  firstName: string,
  lastName: string,
  email: string,
) => `
Name: **${firstName} ${lastName}**  
Email: **${email}**
`;

export const ProfileAccountSection = () => {
  const { user } = useContext(Context);

  return (
    <>
      <h2 className="card-title text-lg lg:text-xl">Account</h2>
      <p className="prose">
        <Markdown>
          {accountInfoMarkdown(user.first_name, user.last_name, user.email)}
        </Markdown>
      </p>

      {user.is_staff && (
        <div className="mt-3">
          <Alert type="success">
            Your account has admin access! Check out the{" "}
            <a className="link" href={reverse("admin")}>
              admin panel
            </a>
            .
          </Alert>
        </div>
      )}
      <a className="btn btn-outline" href={reverse("accounts_edit")}>
        Edit name
      </a>
      <a className="btn btn-outline" href={reverse("password_change")}>
        Change password
      </a>
    </>
  );
};
