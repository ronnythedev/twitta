import { RandomUser } from "../../models/RandomUsers";

type Props = {
  randomUser: RandomUser;
};

export default function UserCard({ randomUser }: Props) {
  return (
    <div
      key={randomUser.login.username}
      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
    >
      <img
        className="rounded-full"
        width="40"
        src={randomUser.picture.thumbnail}
        alt=""
      />
      <div className="truncate ml-4 leading-5">
        <h4 className="font-bold hover:underline text-[14px] truncate">
          {randomUser.login.username}
        </h4>
        <h5 className="text-[13px] text-gray-500 truncate">
          {randomUser.name.first + " " + randomUser.name.last}
        </h5>
      </div>
      <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
        Follow
      </button>
    </div>
  );
}
