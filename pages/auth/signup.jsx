import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useRouter } from "next/router";
import { Loader } from "../../components";
import useAuthStatus from "../../hooks/useAuthState";

const Signup = () => {
  const router = useRouter();
  const { userLogin, loading } = useAuthStatus();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  // handle user sign up
  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: fullName,
        });
        const user = userCredential.user;
        router.push("/");
        setLoader(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoader(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  if (userLogin) {
    router.push("/");
    return <Loader />;
  }

  return (
    <div className="px-6 md:px-10 lg:px-16">
      {loader && <Loader />}
      <div className="flex justify-end bg-gradient-to-r from-green-500 to-black via-green-400 py-1 md:py-2">
        <div className="flex items-center justify-center">
          <Image
            src="/img/logo.png"
            alt="twitter-logo"
            width={44}
            height={44}
            className="mb-4 scaleChange mr-12 md:mr-20 mt-5"
          />
          <p className="text-white text-xl mr-2 md:mr-4">Language: English</p>
        </div>
      </div>
      <div className="px-8">
        <h1 className="mt-12 md:mt-20 font-semibold text-xl md:text-2xl lg:text-3xl">
          Join Twitter Today.
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full name"
            className="authInput"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            className="authInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="authInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="sm:w-[350px] md:w-[450px] w-full flex justify-center mt-1">
              <p className="text-center text-red-400">
                {error.replace("Firebase: Error (auth/", "").replace(")", "")}
              </p>
            </div>
          )}
          <p className="font-light mt-2 mb-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-400">
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="sm:w-[350px] md:w-[450px] w-full bg-blue-500 text-white py-2 rounded relative"
          >
            <p>Sign up</p>
            <AiOutlineArrowRight className="absolute right-2 top-3" />
          </button>
          <p className="sm:w-[350px] md:w-[450px] w-full font-light text-sm mt-3">
            By signing up, you agree to the{" "}
            <span className="text-blue-500">Terms of Service</span> and{" "}
            <span className="text-blue-500">Privacy Policy,</span> including{" "}
            <span className="text-blue-500">Cookie Use.</span> Other will be
            able to find you by email or name when provided.
          </p>
          <div className="mt-4 w-[120px] text-center rounded text-white flex items-center justify-center">
            <Link href="/auth" className="bg-blue-500 w-full py-2 rounded">
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
