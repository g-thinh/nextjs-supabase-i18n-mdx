import { FormForgotPassword } from "@/components/FormForgotPassword";
import { FormSignin } from "@/components/FormSignin";
import { FormUpdatePassword } from "@/components/FormUpdatePassword";
import { Article, Main, Section } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export async function getStaticProps({ locale = "en" }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "form"])),
    },
  };
}

export default function UpdatePasswordPage() {
  const { t } = useTranslation(["common", "form"]);
  return (
    <>
      <Head>
        <title>{`${t("form:update-password.title")} - ${t("title")}`}</title>
      </Head>
      <Main type="full">
        <Article>
          <Section>
            <FormUpdatePassword />
          </Section>
        </Article>
      </Main>
    </>
  );
}
