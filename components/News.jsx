import React, { useState, useEffect } from "react";
import Image from "next/legacy/image";

const News = ({ news }) => {
  const [tweets, setTweets] = useState(0);
  const [peoples, setPeoples] = useState(0);

  useEffect(() => {
    setTweets(Math.floor(Math.random() * 500) + 30);
    setPeoples(Math.floor(Math.random() * 70000) + 2000);
  }, []);

  const { title, url, urlToImage } = news;
  return (
    <div className="mb-4 hover:bg-gray-200 border-b-2 pb-1">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-start gap-3 justify-between"
      >
        {title}

        <img src={urlToImage} alt="news-img" className="rounded-md newsImage" />
      </a>
      <div className="flex justify-between">
        <p className="text-gray-600 text-xs">{tweets}k Tweets</p>
        <p className="text-gray-600 text-xs">
          {peoples} people are Tweeting about this.
        </p>
      </div>
    </div>
  );
};

export default News;
