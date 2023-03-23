import { Article, Main, Section } from "@/components/Layout";
import { getDocBySlug } from "@/utils/docs.api";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";

export async function getStaticProps({ locale = "en" }: GetStaticPropsContext) {
  const { content, meta } = getDocBySlug("landing", locale);
  const source = await serialize(content);
  return {
    props: {
      content: source,
      meta,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function Home({
  meta,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(["common"]);
  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <Main>
        <Article>
          <Section>
            <h1>{t("title")}</h1>
            <h2>{t("welcome")}</h2>
            <MDXRemote {...content} />
          </Section>
        </Article>
      </Main>
    </>
  );
}
