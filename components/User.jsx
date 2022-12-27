import React from "react";
import Image from "next/image";

const User = ({ user }) => {
  const { name, login, picture } = user;
  return (
    <div className="flex justify-between items-center xl:w-[70%] lg:w-[90%] w-full mb-3 mt-2 hover:bg-gray-200 rounded-md">
      <Image
        src={picture.medium}
        alt="user"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="w-[60%] ml-3">
        <p className="font-bold">
          {name.first} {name.last}
        </p>
        <p>{login.username}</p>
      </div>
      <button className="bg-blue-500 px-5 py-2 rounded-3xl text-white">
        Follow
      </button>
    </div>
  );
};

export default User;
