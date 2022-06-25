import { useState } from "react";
import { EnumNewsArticles } from "../../models/NewsArticle";
import { EnumRandomUsers } from "../../models/RandomUsers";
import NewsCard from "./NewsCard";
import TopSearch from "./TopSearch";
import UserCard from "./UserCard";

type Props = {
  articles: EnumNewsArticles;
  randomUsers: EnumRandomUsers;
};

export default function Index({ articles, randomUsers }: Props) {
  const [articleNumber, setArticleNumber] = useState(3);
  const [randomUsersNumber, setRandomUsersNumber] = useState(5);
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <TopSearch />

      <div className="text-gray-700 space-y3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        <>
          {articles.slice(0, articleNumber).map((article) => (
            <NewsCard key={article.title} article={article} />
          ))}
        </>
        <button
          onClick={() => setArticleNumber(articleNumber + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
      <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {randomUsers.slice(0, randomUsersNumber).map((randomUser) => (
          <UserCard randomUser={randomUser} />
        ))}
        <button
          onClick={() => {
            setRandomUsersNumber(randomUsersNumber + 5);
          }}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
    </div>
  );
}
