import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Sidebar, Widgets, Post, Comment } from "../../components";
import Head from "next/head";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

export async function getServerSideProps() {
  const trendingNews = await fetch(
    "https://saurav.tech/NewsAPI/everything/cnn.json"
  ).then((data) => data.json());

  const whoToFollow = await fetch("https://randomuser.me/api/?results=30").then(
    (res) => res.json()
  );

  return {
    props: {
      trendingNews,
      whoToFollow,
    },
  };
}

const PostDetail = ({ trendingNews, whoToFollow }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = router.query;

  // fetch all comment for the post
  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot));
    onSnapshot(
      query(
        collection(db, "posts", id, "comment"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [id]);

  // handle user signout
  const handleSignout = () => {
    signOut(auth).then(() => {
      router.push("/auth");
    });
  };

  return (
    <>
      <Head>
        <title>Post - Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen py-3 mx-auto max-w-8xl md:px-2 xl:px-12">
        {/* Sidebar */}
        <Sidebar />

        {/* Feeds */}
        <div className="ml-0  sm:ml-16 lg:ml-64 shadow-md w-full lg:w-1/2 ">
          {/* Top bar */}
          <div className="flex items-center justify-between py-2 px-4 border-b-2">
            <Link href="/">
              <h1 className="font-bold text-2xl flex items-center gap-1">
                <HiOutlineArrowNarrowLeft /> Home
              </h1>
            </Link>

            <div
              onClick={handleSignout}
              className="flex items-center gap-2 cursor-pointer"
            >
              <p>Logout</p>
            </div>
          </div>
          <Post post={post} id={id} page={true} />
          <div>
            {comments?.length > 0 && (
              <AnimatePresence>
                {comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Comment
                      key={index}
                      comment={comment}
                      id={comment.id}
                      postId={id}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Widgets */}
        <Widgets
          trendingNews={trendingNews?.articles}
          whoToFollow={whoToFollow?.results}
        />
      </main>
    </>
  );
};

export default PostDetail;