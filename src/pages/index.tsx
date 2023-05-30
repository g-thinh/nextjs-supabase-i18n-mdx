import { HeroLanding } from "@/components/HeroLanding";
import { Article, Main, Section } from "@/components/Layout";
import { getDocBySlug } from "@/utils/docs.api";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { LatestPosts } from "@/components/LatestPosts";

export async function getStaticProps({ locale = "en" }: GetStaticPropsContext) {
  const { content, meta } = getDocBySlug("landing", { locale });
  const source = await serialize(content);
  return {
    props: {
      content: source,
      meta,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function LandingPage({
  meta,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(["common"]);
  return (
    <>
      <Head>
        <title>{`${meta.title} - ${t("title")}`}</title>
      </Head>
      <HeroLanding />
      <Main type={"full"}>
        <Article>
          <Section>
            <MDXRemote {...content} />
          </Section>
        </Article>
        <Article>
          <LatestPosts />
        </Article>
      </Main>
    </>
  );
}
