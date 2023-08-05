import { ContentProvider } from "../components/store";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContentProvider>
      <Component {...pageProps} />
    </ContentProvider>
  )
}
