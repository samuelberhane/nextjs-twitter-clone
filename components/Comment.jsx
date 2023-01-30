import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import Moment from "react-moment";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

const Comment = ({ comment, id, postId }) => {
  const [userLiked, setUserLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", postId, "comment", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, []);

  // find user id in comment likes
  useEffect(() => {
    setUserLiked(
      likes.findIndex((like) => like.id === auth?.currentUser?.uid) !== -1
    );
  }, [likes, auth?.currentUser?.uid]);

  //   handle comment likes
  const handleLike = async () => {
    if (userLiked)
      await deleteDoc(
        doc(db, "posts", postId, "comment", id, "likes", auth?.currentUser?.uid)
      );
    else {
      await setDoc(
        doc(
          db,
          "posts",
          postId,
          "comment",
          id,
          "likes",
          auth?.currentUser?.uid
        ),
        {
          username: auth?.currentUser?.displayName,
        }
      );
    }
  };

  //   handle comment delete
  const handleDelete = async () => {
    await deleteDoc(doc(db, "posts", postId, "comment", id));
  };
  return (
    <div className="ml-16 mr-4 px-3 py-2 mt-2 rounded-2xl shadow-md border-2 flex gap-2">
      <div>
        <div className="flex justify-between items-center pt-[0.1rem]">
          <h3 className="font-bold">
            {comment?.data()?.username}{" "}
            <span className="text-sm font-light">
              - {comment?.data()?.userEmail}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              {" "}
              -{" "}
              {<Moment fromNow>{comment?.data()?.timestamp?.toDate()}</Moment>}
            </span>
          </h3>
        </div>
        <p className="text-sm">{comment?.data()?.commentText}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="controller">
            <AiOutlineHeart
              className={`${
                userLiked && "text-red-600 bg-red-100"
              } hoverEffect`}
              onClick={handleLike}
            />
            {likes.length}
          </div>
          {(auth?.currentUser?.uid === comment?.data()?.postOwner ||
            auth?.currentUser?.uid === comment?.data()?.userId) && (
            <div className="controller" onClick={handleDelete}>
              <RiDeleteBin6Line className="hoverEffect" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
