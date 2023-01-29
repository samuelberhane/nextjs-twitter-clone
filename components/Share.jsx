import Image from "next/legacy/image";
import { MdPermMedia } from "react-icons/md";
import { BsFillEmojiExpressionlessFill } from "react-icons/bs";
import { auth, db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Loader from "./Loader";

const Share = () => {
  const [text, setText] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle tweet
  const handleTweet = async (e) => {
    e.preventDefault();
    const uuid = uuidv4();
    // Upload images to firebase storage
    const storeImg = () => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const storageRef = ref(storage, `posts/${uuid}/image`);
        const uploadTask = uploadBytesResumable(storageRef, postImg);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    let postData = {
      creator: auth?.currentUser?.uid,
      userImg: auth?.currentUser?.photoURL,
      username: auth?.currentUser?.displayName,
      userEmail: auth?.currentUser?.email,
      timestamp: new Date().getTime(),
      uuid,
      text,
    };

    if (postImg) {
      setLoading(true);
      storeImg()
        .then(async (imgUrl) => {
          postData.imgUrl = imgUrl;
          const docRef = await addDoc(collection(db, "posts"), postData);
          setLoading(false);
        })

        .catch((error) => {
          alert("Image not uploaded");
          setLoading(false);
        });
    } else {
      const docRef = await addDoc(collection(db, "posts"), postData);
    }
    setPostImg(null);
    setText("");
  };

  return (
    <div className="flex gap-3 p-3 shadow-md border-b-4">
      {/* loading effect */}
      {loading && <Loader />}

      {/* User Profile */}
      <div>
        <Image
          src={auth?.currentUser?.photoURL || "/img/user.jpg"}
          alt="user"
          width="50"
          height="50"
          className="rounded-full"
        ></Image>
      </div>

      {/* Tweet Input */}
      <form className="w-full" onSubmit={handleTweet}>
        <input
          type="text"
          placeholder="What's happening?"
          className="py-3 px-2 w-full outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-between px-3 items-center">
          <div className="flex gap-4 text-lg text-blue-500">
            <label htmlFor="imageFile">
              <MdPermMedia className="hover:shadow-lg cursor-pointer hover:scale-110" />
            </label>
            <input
              type="file"
              id="imageFile"
              className="hidden"
              accept=".jpg,.png,.jpeg"
              onChange={(e) => setPostImg(e.target.files[0])}
            />
            <BsFillEmojiExpressionlessFill className="hover:shadow-lg cursor-pointer hover:scale-110" />
          </div>
          <button
            className="font-bold bg-blue-500 rounded-2xl px-5 py-2 text-white"
            type="submit"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default Share;
