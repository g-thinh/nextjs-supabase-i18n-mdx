import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { MDXGlobalProvider } from "@/components/MDXProvider";

function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <MDXGlobalProvider>
        <Layout>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </MDXGlobalProvider>
    </SessionContextProvider>
  );
}

export default appWithTranslation(App);
