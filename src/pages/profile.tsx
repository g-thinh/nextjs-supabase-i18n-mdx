import { Article, Main, Section } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useUser } from "@supabase/auth-helpers-react";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export async function getStaticProps({ locale = "en" }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function ProfilePage() {
  const { t } = useTranslation(["common"]);
  const user = useUser();

  return (
    <ProtectedRoute redirectTo={"/signin"}>
      <Head>
        <title>{`${t("header.profile")} - ${t("title")}`}</title>
      </Head>
      <Main type="full">
        <Article>
          <Section>
            <h2>{`${t("welcome")}, ${user?.user_metadata.username}`}</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Section>
        </Article>
      </Main>
    </ProtectedRoute>
  );
}
