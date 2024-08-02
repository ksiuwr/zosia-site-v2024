import { Alert } from "@client/components/alert/Alert";
import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import {
  BookOpenIcon,
  HomeModernIcon,
  LockClosedIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/solid";
import { Context, reverse, templates } from "@reactivated";
import clsx from "clsx";
import React, { useContext } from "react";

const ICON_SIZE = 8;

export const Template = (props: templates.Profile) => {
  const { user } = useContext(Context);

  return (
    <Layout>
      <CenteredContentContainer>
        <div className="my-6">
          <div className="join flex justify-evenly lg:flex-row">
            <a
              className={clsx(
                "btn btn-outline join-item h-fit grow flex-col py-4",
                user.is_staff && "rounded-bl-none",
              )}
              href={reverse("boardgames_index")}
            >
              <PuzzlePieceIcon className={`size-${ICON_SIZE}`} />
              Boardgames
            </a>
            <a
              className="btn btn-outline join-item h-fit grow flex-col px-8 py-4"
              href={reverse("rooms_index")}
            >
              <HomeModernIcon className={`size-${ICON_SIZE}`} />
              Rooms
            </a>
            <a
              className={clsx(
                "btn btn-outline join-item h-fit grow flex-col py-4",
                user.is_staff && "rounded-br-none",
              )}
              href={reverse("lectures_add")}
            >
              <BookOpenIcon className={`size-${ICON_SIZE}`} />
              Add lecture
            </a>
          </div>
          {user.is_staff && (
            <a
              className="btn btn-outline btn-block h-fit rounded-t-none border-t-0 py-4"
              href={reverse("admin")}
            >
              <LockClosedIcon className={`size-${ICON_SIZE}`} />
              Admin panel
            </a>
          )}
        </div>

        <div className="card card-compact mb-8 bg-base-300 lg:card-normal">
          <div className="card-body">
            <h2 className="card-title text-lg lg:text-xl">Payments</h2>
            <p className="whitespace-pre-wrap">Your payments</p>

            <div className="divider divider-accent my-1"></div>

            <h2 className="card-title text-lg lg:text-xl">Preferences</h2>
            <p className="whitespace-pre-wrap">Your info</p>
            <a
              className="btn btn-outline btn-block"
              href={reverse("user_zosia_register")}
            >
              Update preferences
            </a>

            <div className="divider divider-accent my-1"></div>

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
          </div>
        </div>
      </CenteredContentContainer>
    </Layout>
  );
};
