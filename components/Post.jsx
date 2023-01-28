import Image from "next/legacy/image";
import { BsChevronDown } from "react-icons/bs";
import {
  AiOutlineComment,
  AiOutlineRetweet,
  AiOutlineHeart,
  AiOutlineUpload,
} from "react-icons/ai";

const Post = ({ image }) => {
  return (
    <div className="flex gap-6 p-4 border-b-2">
      {/* User Profile */}
      <img
        src="https://images.pexels.com/photos/14807470/pexels-photo-14807470.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="user"
        className="rounded-full w-10 h-10"
      />

      <div>
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold">
            Samuel
            <span className="font-100 text-gray-600">@samuelBrhane - 3m</span>
          </h3>
          <BsChevronDown />
        </div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil,
          aliquid. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Nihil, aliquid.{" "}
          <span className="text-blue-500">#Lorem, ipsum dolor.</span>
        </p>
        {image && (
          <Image
            src="https://images.pexels.com/photos/14807470/pexels-photo-14807470.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="post"
            width="100"
            height="100"
            className="postImage rounded-md mt-2"
          />
        )}

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1">
            <AiOutlineComment /> 1
          </div>
          <div className="flex items-center gap-1">
            <AiOutlineRetweet />
          </div>
          <div className="flex items-center gap-1">
            <AiOutlineHeart /> 8
          </div>
          <div className="flex items-center gap-1">
            <AiOutlineUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
