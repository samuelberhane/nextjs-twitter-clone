import "../styles/globals.css";
import { PostContextProvider } from "../contexts/postContext";

export default function App({ Component, pageProps }) {
  return (
    <PostContextProvider>
      <Component {...pageProps} />
    </PostContextProvider>
  );
}
