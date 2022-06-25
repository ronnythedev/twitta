import { DotsHorizontalIcon } from "@heroicons/react/outline";

export default function MiniProfile() {
  return (
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
  );
}
