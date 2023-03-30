import { FormForgotPassword } from "@/components/FormForgotPassword";
import { FormSignin } from "@/components/FormSignin";
import { Article, Main, Section } from "@/components/Layout";
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

export default function ForgotPasswordPage() {
  const { t } = useTranslation(["common", "form"]);
  return (
    <>
      <Head>
        <title>{`${t("form:forgot-password.title")}- ${t("title")}`}</title>
      </Head>
      <Main type="full">
        <Article>
          <Section>
            <FormForgotPassword />
          </Section>
        </Article>
      </Main>
    </>
  );
}
