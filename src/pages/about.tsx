import { Article, Main, Section, Banner } from "@/components/Layout";
import { getDocBySlug } from "@/utils/docs.api";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";

export async function getStaticProps({ locale = "en" }: GetStaticPropsContext) {
  const { content, meta } = getDocBySlug("about", locale);
  const source = await serialize(content);
  return {
    props: {
      content: source,
      meta,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function AboutPage({
  meta,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(["common"]);
  return (
    <>
      <Head>
        <title>
          {meta.title} - {t("title")}
        </title>
      </Head>
      <Banner>
        <Article>
          <Section
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>{meta.title}</h2>
          </Section>
        </Article>
      </Banner>
      <Main>
        <Article>
          <Section>
            <MDXRemote {...content} />
          </Section>
        </Article>
      </Main>
    </>
  );
}
