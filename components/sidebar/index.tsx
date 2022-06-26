import Image from "next/image";
import MenuItem from "./MenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkAltIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import MiniProfile from "./MiniProfile";
import { useSession, signIn } from "next-auth/react";

export default function Index() {
  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image src="/images/logo.png" width="50" height="50" />
      </div>

      <div className="mt-4 mb-2.5 xl:items-start">
        <MenuItem menuText="Home" Icon={HomeIcon} active />
        <MenuItem menuText="Explore" Icon={HashtagIcon} />

        {session && (
          <>
            <MenuItem menuText="Notifications" Icon={BellIcon} />
            <MenuItem menuText="Messages" Icon={InboxIcon} />
            <MenuItem menuText="Bookmark" Icon={BookmarkAltIcon} />
            <MenuItem menuText="Lists" Icon={ClipboardIcon} />
            <MenuItem menuText="Profile" Icon={UserIcon} />
            <MenuItem menuText="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>

      {session ? (
        <>
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Tweet
          </button>

          <MiniProfile
            userName={session.user?.name}
            userPhoto={session.user?.image}
            userUserName={session.user?.username}
          />
        </>
      ) : (
        <button
          onClick={() => {
            signIn();
          }}
          className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
