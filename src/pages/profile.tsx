import { Article, Main, Section } from "@/components/Layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(context);

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect the route if we do not have a session
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
      ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
    },
  };
}

export default function ProfilePage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation(["common"]);
  return (
    <>
      <Head>
        <title>{`${t("header.profile")} - ${t("title")}`}</title>
      </Head>
      <Main type="full">
        <Article>
          <Section>
            <h2>{`${t("welcome")}, ${user.user_metadata.username}`}</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Section>
        </Article>
      </Main>
    </>
  );
}
