import { Article, Banner, Main, Section } from "@/components/Layout";
import { getDocBySlug, getDocsBySlug } from "@/utils/docs.api";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import NextLink from "next/link";

export async function getStaticProps({ locale = "en" }: GetStaticPropsContext) {
  const { content, meta } = getDocBySlug("blog", locale);
  const docs = getDocsBySlug("blog", locale);

  const source = await serialize(content);
  return {
    props: {
      content: source,
      meta,
      docs,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function BlogPage({
  meta,
  content,
  docs,
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
            <ul>
              {docs.map((doc) => {
                return (
                  <li key={doc.meta.title}>
                    <NextLink href={doc.slug}>{doc.meta.title}</NextLink>
                  </li>
                );
              })}
            </ul>
          </Section>
        </Article>
      </Main>
    </>
  );
}
