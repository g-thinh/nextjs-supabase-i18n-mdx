import { Article, Banner, Main, Section } from "@/components/Layout";
import { getDocBySlug, getDocsPaths } from "@/utils/docs.api";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import { Image } from "@/components/Image";
import Card from "@/components/Card";
import { List, ListItem } from "@/components/List";

export async function getStaticProps({
  locale = "en",
  params,
}: GetStaticPropsContext) {
  const id = params?.id;

  if (typeof id != "string") {
    return {
      notFound: true,
    };
  }

  const slug = path.join("blog", id);
  const { content, meta } = getDocBySlug(slug, { locale });
  const source = await serialize(content);
  return {
    props: {
      content: source,
      meta,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export function getStaticPaths(): GetStaticPathsResult {
  const paths = getDocsPaths("blog");
  return {
    paths,
    fallback: false,
  };
}

export default function BlogPostPage({
  meta,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(["common"]);

  const components = {
    Image,
    Card,
    List,
    ListItem,
  };

  return (
    <>
      <Head>
        <title>{`${meta.title} - ${t("title")}`}</title>
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
      <Main type="full">
        <Article>
          <Section>
            <MDXRemote {...content} components={components} />
          </Section>
        </Article>
      </Main>
    </>
  );
}
