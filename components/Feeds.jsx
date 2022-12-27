import { GiDrippingStar } from "react-icons/gi";
import { Share, Post } from "./";

const Feeds = () => {
  return (
    <div className="ml- 0  sm:ml-16 lg:ml-60 shadow-md w-full lg:w-1/2 ">
      {/* Top bar */}
      <div className="flex items-center justify-between py-2 px-4 border-b-2">
        <h1 className="font-bold text-2xl">Home</h1>
        <GiDrippingStar className="text-xl text-blue-600" />
      </div>

      {/* tweet component */}
      <Share />

      {/* posts */}
      <Post image={false} />
      <Post image={true} />
      <Post image={true} />
      <Post image={false} />
    </div>
  );
};

export default Feeds;