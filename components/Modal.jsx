import { useGlobalContext } from "../contexts/postContext";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { BsFillEmojiExpressionlessFill } from "react-icons/bs";
import { useRouter } from "next/router";

const Modal = () => {
  const router = useRouter();
  const { dispatch, postId } = useGlobalContext();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => setPost(snapshot));
  }, [postId]);

  const handleComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts", postId, "comment"), {
      commentText,
      userId: auth?.currentUser?.uid,
      username: auth?.currentUser?.displayName,
      userImg: auth?.currentUser?.photoURL,
      userEmail: auth?.currentUser?.email,
      timestamp: new Date().getTime(),
    });
    dispatch({ type: "CLOSE_MODAL" });
    setCommentText("");
    router.push(`post/${postId}`);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-[rgba(12,23,12,0.5)] z-50 px-1">
      <div className="mt-20 border-2 h-[290px] bg-white w-full sm:w-[500px] rounded-md shadow relative py-9">
        <FaTimes
          className="absolute top-2 left-2 text-xl cursor-pointer"
          onClick={() => dispatch({ type: "CLOSE_MODAL" })}
        />
        <div className="border-t-2 py-4 px-2">
          <div className="flex gap-2">
            <img
              src={post?.data().userImg || "/img/user.jpg"}
              alt="user"
              className="rounded-full w-10 h-10"
            />
            <div className=" mb-1">
              <div className="flex items-center gap-1">
                <h3 className="font-bold whitespace-nowrap">
                  {post?.data()?.username}{" "}
                </h3>
                <p className="whitespace-nowrap text-sm">
                  {" "}
                  - {post?.data()?.userEmail}
                </p>
              </div>

              <p className="text-sm">
                {post?.data()?.text.length > 65
                  ? post?.data()?.text.slice(0, 65) + "..."
                  : post?.data()?.text}
              </p>
            </div>
          </div>
          <div className="flex gap-1 mt-2">
            {/* User Profile */}
            <img
              src={auth?.currentUser?.photoURL || "/img/user.jpg"}
              alt="user"
              className="rounded-full w-10 h-10"
            />

            {/* comment Input */}
            <form className="w-full" onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Write your comment"
                className="p-1 w-full outline-none border-b-2 mb-2 pb-10"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-between px-3 items-center">
                <div className="flex gap-4 text-lg text-blue-500">
                  <BsFillEmojiExpressionlessFill className="hover:shadow-lg cursor-pointer hover:scale-110" />
                </div>
                <button
                  className="font-bold bg-blue-500 rounded-3xl px-9 py-2 text-white"
                  type="submit"
                >
                  Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
