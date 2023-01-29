import React, { useContext, useReducer } from "react";

const postContext = React.createContext();

const initialState = {
  posts: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "":
      return { ...state };
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
