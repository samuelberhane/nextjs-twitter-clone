import {
  AiOutlineComment,
  AiOutlineRetweet,
  AiOutlineHeart,
  AiOutlineUpload,
} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { auth, db, storage } from "../firebase/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useGlobalContext } from "../contexts/postContext";
import Moment from "react-moment";

const Post = ({ post, id, page }) => {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [userLiked, setUserLiked] = useState(false);
  const { dispatch } = useGlobalContext();

  // Get post likes
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );

    onSnapshot(collection(db, "posts", id, "comment"), (snapshot) =>
      setComments(snapshot.docs)
    );
  }, []);

  // find user id in post likes
  useEffect(() => {
    setUserLiked(
      likes.findIndex((like) => like.id === auth?.currentUser?.uid) !== -1
    );
  }, [likes, auth?.currentUser?.uid]);

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

  // handle delete post
  const handleDelete = async () => {
    await deleteDoc(doc(db, "posts", id));
    if (post?.data()?.imgUrl) {
      deleteObject(ref(storage, `posts/${post?.data()?.uuid}/image`));
    }
  };

  return (
    <div className="flex gap-6 p-4 border-b-2">
      {/* User Profile */}
      <img
        src={post?.data()?.userImg || "/img/user.jpg"}
        alt="user"
        className="rounded-full w-10 h-10"
      />

      <div className="w-full">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold">
            {post?.data()?.username}{" "}
            <span className="text-sm font-light">
              - {post?.data()?.userEmail}
            </span>
            <span className="font-100 text-gray-600">
              {" "}
              - {<Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>}
            </span>
          </h3>
          {auth?.currentUser?.uid === post?.data()?.creator && !page && (
            <div className="controller" onClick={handleDelete}>
              <RiDeleteBin6Line className="hoverEffect" />
            </div>
          )}
        </div>
        <p className="text-[14px] md:text-[16px]">
          {post?.data()?.text.length > 120
            ? post?.data()?.text.slice(0, 120) + "..."
            : post?.data()?.text}
        </p>
        {post?.data()?.imgUrl && (
          <img
            src={post?.data()?.imgUrl}
            alt="post"
            className="w-full h-[240px] md:h-[320px] lg:h-[360px] rounded-md mt-2"
          />
        )}

        <div className="flex justify-between items-center mt-2 w-full">
          <div className="controller">
            <AiOutlineComment
              className="hoverEffect"
              onClick={() => dispatch({ type: "OPEN_MODAL", payload: id })}
            />
            {comments?.length}
          </div>
          <div className="controller">
            <AiOutlineRetweet className="hoverEffect" />
          </div>
          <div className="controller">
            <AiOutlineHeart
              className={`${
                userLiked && "text-red-600 bg-red-100"
              } hoverEffect`}
              onClick={handleLike}
            />
            {likes?.length}
          </div>
          <div className="controller">
            <AiOutlineUpload className="hoverEffect" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
