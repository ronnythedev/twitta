import Image from "next/image";
import MenuItem from "./MenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkAltIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";

export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image src="/images/logo.png" width="50" height="50" />
      </div>

      <div className="mt-4 mb-2.5 xl:items-start">
        <MenuItem menuText="Home" Icon={HomeIcon} active />
        <MenuItem menuText="Explore" Icon={HashtagIcon} />
        <MenuItem menuText="Notifications" Icon={BellIcon} />
        <MenuItem menuText="Messages" Icon={InboxIcon} />
        <MenuItem menuText="Bookmark" Icon={BookmarkAltIcon} />
        <MenuItem menuText="Lists" Icon={ClipboardIcon} />
        <MenuItem menuText="Profile" Icon={UserIcon} />
        <MenuItem menuText="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Tweet
      </button>

      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <img
          src="/images/profile.png"
          alt="user-image"
          className="h-10 w-10 rounded-full xl:mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold ">Ronny Delgado</h4>
          <p className="text-gray-500">@ronnythedev</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  );
}
