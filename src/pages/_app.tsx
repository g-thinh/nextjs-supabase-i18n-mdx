import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  );
}

export default appWithTranslation(App);
