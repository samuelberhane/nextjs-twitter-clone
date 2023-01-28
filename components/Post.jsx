import Image from "next/legacy/image";
import { BsChevronDown } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import {
  AiOutlineComment,
  AiOutlineRetweet,
  AiOutlineHeart,
  AiOutlineUpload,
} from "react-icons/ai";

const Post = ({ image, post }) => {
  const {
    data: { imgUrl, timestamp, text, userEmail, username, userImg },
    id,
  } = post;
  return (
    <div className="flex gap-6 p-4 border-b-2">
      {/* User Profile */}
      <img src={userImg} alt="user" className="rounded-full w-10 h-10" />

      <div>
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold">
            {username}{" "}
            <span className="font-100 text-gray-600">
              - {formatDistanceToNow(new Date(timestamp))}
            </span>
          </h3>
          <BsChevronDown />
        </div>
        <p>{text.length > 150 ? text.slice(0, 150) + "..." : text}</p>
        {image && (
          <img
            src={imgUrl}
            alt="post"
            className="w-full h-[280px] rounded-md mt-2"
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
