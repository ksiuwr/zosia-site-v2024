import {
  DocumentPlusIcon,
  HomeModernIcon,
  LockClosedIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/solid";
import { Context, reverse } from "@reactivated";
import clsx from "clsx";
import React, { useContext } from "react";

const ICON_CSS = "size-6 lg:size-8";

export const ProfileNavbar = () => {
  const { user } = useContext(Context);

  return (
    <div className="my-6">
      <div className="join flex justify-evenly">
        <a
          className={clsx(
            "btn btn-outline join-item h-fit w-1/3 grow flex-col py-4",
            user.is_staff && "rounded-bl-none",
          )}
          href={reverse("boardgames_index")}
        >
          <PuzzlePieceIcon className={ICON_CSS} />
          Boardgames
        </a>
        <a
          className="btn btn-outline join-item h-fit w-1/3 grow flex-col py-4"
          href={reverse("rooms_index")}
        >
          <HomeModernIcon className={ICON_CSS} />
          Rooms
        </a>
        <a
          className={clsx(
            "btn btn-outline join-item h-fit w-1/3 grow flex-col py-4",
            user.is_staff && "rounded-br-none",
          )}
          href={reverse("lectures_add")}
        >
          <DocumentPlusIcon className={ICON_CSS} />
          Add lecture
        </a>
      </div>
      {user.is_staff && (
        <a
          className="btn btn-outline btn-block h-fit rounded-t-none border-t-0 py-4"
          href={reverse("admin")}
        >
          <LockClosedIcon className={ICON_CSS} />
          Admin panel
        </a>
      )}
    </div>
  );
};
