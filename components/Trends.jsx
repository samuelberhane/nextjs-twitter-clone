import { AnimatePresence, motion } from "framer-motion";
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
      <div className="flex items-center justify-between py-2">
        <h1 className="font-bold text-xl">Trends for you</h1>
        <BsNewspaper className="text-blue-600 text-xl" />
      </div>
      <div className="mt-2">
        <AnimatePresence>
          {trendingNews?.slice(0, newsNumber)?.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <News key={index} news={news} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
