import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { signOut } from "next-auth/react";

type Props = {
  userName: string | null | undefined;
  userPhoto: string | null | undefined;
  userUserName: string | null | undefined;
};

export default function MiniProfile({
  userName,
  userPhoto,
  userUserName,
}: Props) {
  return (
    <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
      <img
        onClick={() => {
          signOut();
        }}
        src={userPhoto ?? "/images/profile.png"}
        alt="user-image"
        className="h-10 w-10 rounded-full xl:mr-2"
      />
      <div className="leading-5 hidden xl:inline">
        <h4 className="font-bold ">{userName}</h4>
        <p className="text-gray-500">@{userUserName}</p>
      </div>
      <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
    </div>
  );
}
