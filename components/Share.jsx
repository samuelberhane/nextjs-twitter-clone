import Image from "next/image";
import { MdPermMedia } from "react-icons/md";
import { BsFillEmojiExpressionlessFill } from "react-icons/bs";

const Share = () => {
  return (
    <div className="flex gap-3 p-3 shadow-md border-b-4">
      {/* User Profile */}
      <div>
        <Image
          src="https://images.pexels.com/photos/14807470/pexels-photo-14807470.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="user"
          width="50"
          height="50"
          className="rounded-full"
        ></Image>
      </div>

      {/* Tweet Input */}
      <div className="w-full">
        <input
          type="text"
          placeholder="What's happening?"
          className="py-3 px-2 w-full outline-none"
        />
        <div className="flex justify-between px-3 items-center">
          <div className="flex gap-4 text-lg text-blue-500">
            <MdPermMedia />
            <BsFillEmojiExpressionlessFill />
          </div>
          <button className="font-bold bg-blue-500 rounded-2xl px-5 py-2 text-white">
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
