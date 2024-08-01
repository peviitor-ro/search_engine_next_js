import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>peviitor.ro - motor de cautare locuri de munca</title>
        <meta
          name="description"
          content="peviitor | motor de cautare locuri de munca"
        />
        <meta
          property="og:title"
          content="peviitor.ro - motor de cautare locuri de munca"
        />
        {/* Open Graph Meta Tags */}
        <meta
          property="og:image"
          content="/search_engine_next_js/opengraph-image.png"
        />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} /> */}

        {/* Favicons */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/search_engine_next_js/favicon.png"
        />
        <link rel="shortcut icon" href="/search_engine_next_js/favicon.png" />

        {/* iOS icons */}
        <link
          rel="apple-touch-icon"
          href="/search_engine_next_js/favicon.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
