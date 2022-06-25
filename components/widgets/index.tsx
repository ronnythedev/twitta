import { useState } from "react";
import { EnumNewsArticles } from "../../models/NewsArticle";
import NewsCard from "./NewsCard";
import TopSearch from "./TopSearch";

type Props = {
  articles: EnumNewsArticles;
};

export default function Index({ articles }: Props) {
  const [articleNumber, setArticleNumber] = useState(3);

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
    </div>
  );
}
