import { getDocBySlug } from "@/utils/docs.api";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

export async function getStaticProps({ locale = "en" }: GetStaticPropsContext) {
  const { content, meta } = getDocBySlug("landing", locale);
  const source = await serialize(content);
  return {
    props: {
      content: source,
      meta,
    },
  };
}

export default function Home({
  meta,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <MDXRemote {...content} />
    </main>
  );
}
