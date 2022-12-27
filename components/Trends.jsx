import { useState } from "react";
import { BsNewspaper } from "react-icons/bs";
import { News } from "./";

const Trends = ({ trendingNews }) => {
  const [newsNumber, setNewsNumber] = useState(3);
  const handleNews = () => {
    setNewsNumber(newsNumber + 2);
  };

  return (
    <div className="mt-4 px-1">
      <div className="flex items-center justify-between py-2 border-b-2">
        <h1 className="font-bold text-xl">Trends for you</h1>
        <BsNewspaper className="text-blue-600 text-xl" />
      </div>
      {trendingNews?.slice(0, newsNumber)?.map((news, index) => (
        <News key={index} news={news} />
      ))}
      <button
        className="rounded-xl px-4 py-2 bg-blue-200  font-bold"
        onClick={handleNews}
      >
        show more
      </button>
    </div>
  );
};

export default Trends;
