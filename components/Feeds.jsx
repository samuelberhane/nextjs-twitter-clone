import { Share, Post, SearchBar } from "./";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";

const Feeds = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts")),
      orderBy("timestamp", "desc"),
      (snapshot) => setPosts(snapshot.docs)
    );
  }, []);
  console.log("posts", posts);

  // handle user signout
  const handleSignout = () => {
    signOut(auth).then(() => {
      router.push("/auth");
    });
  };

  return (
    <div className="ml-0  sm:ml-16 lg:ml-64 shadow-md w-full lg:w-1/2 ">
      {/* Search bar */}
      <div className="lg:hidden px-3">
        <SearchBar />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between py-2 px-4 border-b-2">
        <h1 className="font-bold text-2xl">Home</h1>
        <div
          onClick={handleSignout}
          className="flex items-center gap-2 cursor-pointer"
        >
          <p>Logout</p>
        </div>
      </div>

      {/* tweet component */}
      <Share />

      {/* posts */}
      <AnimatePresence>
        {posts?.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Post key={index} post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Feeds;
