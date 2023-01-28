import Image from "next/legacy/image";
import { BsChevronDown } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import {
  AiOutlineComment,
  AiOutlineRetweet,
  AiOutlineHeart,
  AiOutlineUpload,
} from "react-icons/ai";
import { auth, db } from "../firebase/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const Post = ({ image, post }) => {
  const [likes, setLikes] = useState([]);
  const [userLiked, setUserLiked] = useState(false);
  const {
    data: { imgUrl, timestamp, text, username, userImg },
    id,
  } = post;

  // Get post likes
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, []);

  // find user id in post likes
  useEffect(() => {
    setUserLiked(
      likes.findIndex((like) => like.id === auth?.currentUser?.uid) !== -1
    );
  }, [likes, auth.currentUser.uid]);

  const handleLike = async () => {
    // remove user id if already liked
    if (userLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", auth?.currentUser?.uid));
    } else {
      // add user if to like array
      await setDoc(doc(db, "posts", id, "likes", auth?.currentUser?.uid), {
        username: auth?.currentUser?.displayName,
      });
    }
  };
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
        <p className="text-[14px] md:text-[16px]">
          {text.length > 120 ? text.slice(0, 120) + "..." : text}
        </p>
        {image && (
          <img
            src={imgUrl}
            alt="post"
            className="w-full h-[240px] md:h-[320px] lg:h-[360px] rounded-md mt-2"
          />
        )}

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1">
            <AiOutlineComment /> 1
          </div>
          <div className="flex items-center gap-1">
            <AiOutlineRetweet />
          </div>
          <div className="flex items-center gap-[0.1rem]">
            <AiOutlineHeart
              className={`hoverEffect ${
                userLiked && "text-red-600 bg-red-100"
              } hover:text-red-600 hover:bg-red-100 text-xl mt-[0.14rem]`}
              onClick={handleLike}
            />
            {likes.length}
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
