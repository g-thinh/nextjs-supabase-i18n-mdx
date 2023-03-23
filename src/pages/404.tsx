import { Article, Main, Section, Banner } from "@/components/Layout";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";

export async function getStaticProps({ locale = "en" }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function NotFoundPage() {
  const { t } = useTranslation(["common"]);

  return (
    <>
      <Head>
        <title>{`${t("not-found.title")} - ${t("title")}`}</title>
      </Head>
      <Banner>
        <Article>
          <Section>
            <h2>{t("not-found.text")}</h2>
          </Section>
        </Article>
      </Banner>
      <Main />
    </>
  );
}
