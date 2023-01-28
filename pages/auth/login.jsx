import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handle login user
  const handleSubmit = (e) => {
    console.log("loading", loading);
    e.preventDefault();
    setLoading(true);
    setError(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2">
      {loading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.6)] z-20 flex items-center justify-center">
          <img src="/img/loader.gif" alt="loader" />
        </div>
      )}
      <div className="h-screen pt-20 flex justify-center">
        <div className="flex flex-col items-center w-full">
          <Image
            src="/img/logo.png"
            alt="twitter-logo"
            width={60}
            height={60}
            className="scaleChange mr-12 md:mr-20 mt-5 ml-16"
          ></Image>
          <p className="font-bold text-gray-500 text-xl mt-8">Welcome Back.</p>

          <form
            onSubmit={handleSubmit}
            className="w-full px-8 overflow-hidden sm:px-16 md:px-4 lg:px-24"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-2 py-1 outline-none border-2 shadow  mt-5"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-2 py-1 outline-none border-2 shadow mt-5"
            />

            {error && (
              <div className="sm:w-[350px] md:w-[450px] w-full flex justify-center mt-1">
                <p className="text-center text-red-400">
                  {error.replace("Firebase: Error (auth/", "").replace(")", "")}
                </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded relative mt-4"
            >
              <p>Log in</p>
              <AiOutlineArrowRight className="absolute right-2 top-3" />
            </button>
            <p className="mt-5 font-light">
              Don't have an account yet?{" "}
              <Link href="/auth/signup" className="text-blue-400">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="text-[#5c89fb] h-screen hidden lg:inline px-8">
        <div className="h-[180px] py-24 px-16">
          <p className="font-bold text-center text-xl">
            Join Twitter today and see what's happening in the world right now
          </p>
        </div>

        <div className="relative w-full socialImg">
          <Image
            src="/img/social.png"
            alt="twitter-logo"
            layout="fill"
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
