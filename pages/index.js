import Head from "next/head";
import { Sidebar, Modal, Widgets, Feeds } from "../components";
import { auth } from "../firebase/firebaseConfig";

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

export default function Home({ trendingNews, whoToFollow }) {
  console.log("auth", auth.currentUser);
  return (
    <>
      <Head>
        <title>Twitter-Clone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen py-3 mx-auto max-w-8xl md:px-2 xl:px-12">
        {/* Sidebar */}
        <Sidebar />

        {/* Feeds */}
        <Feeds />

        {/* Widgets */}
        <Widgets
          trendingNews={trendingNews?.articles}
          whoToFollow={whoToFollow?.results}
        />
      </main>
    </>
  );
}
