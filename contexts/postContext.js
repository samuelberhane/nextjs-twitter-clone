import React, { useContext, useReducer } from "react";

const postContext = React.createContext();

const initialState = {
  isModalOpen: false,
  postId: "id",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true, postId: payload };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false, postId: "id" };
    default:
      state;
  }
};

const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <postContext.Provider value={{ ...state, dispatch }}>
      {children}
    </postContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(postContext);
};

export { PostContextProvider, useGlobalContext };
