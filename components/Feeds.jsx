import { Share, Post, SearchBar } from "./";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useRouter } from "next/router";

const Feeds = ({ posts }) => {
  const router = useRouter();

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
      {posts.map((post, index) => (
        <Post image={post.data.imgUrl ? true : false} key={index} post={post} />
      ))}
    </div>
  );
};

export default Feeds;
