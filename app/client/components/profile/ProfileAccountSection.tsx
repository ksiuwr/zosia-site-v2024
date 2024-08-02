import { Context, reverse } from "@reactivated";
import React, { useContext } from "react";
import { Alert } from "../alert/Alert";

export const ProfileAccountSection = () => {
  const { user } = useContext(Context);

  return (
    <>
      <h2 className="card-title text-lg lg:text-xl">Account</h2>
      <p>
        <span className="font-bold">Name:</span> {user.first_name}{" "}
        {user.last_name}
      </p>
      <p>
        <span className="font-bold">Email:</span> {user.email}
      </p>

      {user.is_staff && (
        <Alert type="warning">
          Your account has admin access! Check out the{" "}
          <a className="link" href={reverse("admin")}>
            admin panel
          </a>
          .
        </Alert>
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
