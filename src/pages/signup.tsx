import { FormSignup } from "@/components/FormSignup";
import { Article, Main, Section } from "@/components/Layout";
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

export default function SignupPage() {
  const { t } = useTranslation(["common"]);
  return (
    <>
      <Head>
        <title>{`${t("form-signup.title")} - ${t("title")}`}</title>
      </Head>
      <Main type="full">
        <Article>
          <Section>
            <FormSignup />
          </Section>
        </Article>
      </Main>
    </>
  );
}
