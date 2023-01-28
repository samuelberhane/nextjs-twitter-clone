import { useState } from "react";
import { Trends, SearchBar, User } from "./";

const Widgets = ({ trendingNews, whoToFollow }) => {
  const [users, setUsers] = useState(3);

  const handleUsers = () => {
    setUsers(users + 2);
  };
  return (
    <div className="hidden lg:inline px-3 py-1 xl:px-6w-1/2 xl:w-1/3 lg:w-[30%]">
      {/* Search bar */}
      <SearchBar className="relative" />

      {/* Trends  */}
      <Trends trendingNews={trendingNews} />

      {/* People to follow */}
      <div className="my-5 pt-2 border-t-4">
        <h1 className="font-bold text-xl">Who to follow</h1>
        {whoToFollow?.slice(0, users)?.map((user, index) => (
          <User key={index} user={user} />
        ))}

        <button
          className="rounded-xl px-4 py-2 bg-blue-200  font-bold"
          onClick={handleUsers}
        >
          show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
