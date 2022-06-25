import { TwittaPost } from "../../models/TwittaPost";
import Header from "./Header";
import Input from "./Input";
import PostCard from "./PostCard";

interface EnumPosts extends Array<TwittaPost> {}

export default function Index() {
  const fakePosts: EnumPosts = [
    {
      id: "1",
      name: "Ronny Delgado",
      username: "ronnythedev",
      userImg: "/images/profile.png",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      text: "Nice computer",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Ronny Delgado",
      username: "ronnythedev",
      userImg: "/images/profile.png",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29tcHV0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      text: "Wow!!!",
      timestamp: "2 days ago",
    },
  ];

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <Header />
      <Input />
      <>
        {fakePosts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </>
    </div>
  );
}
