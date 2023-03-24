import fs from "fs";
import matter from "gray-matter";
import { GetStaticPathsResult } from "next/types";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "/src/content");
const MDX_FILE = new RegExp(/\.mdx$/);

type MetaProps = {
  title: string;
};

export function getDocBySlug(slug: string, locale: string) {
  const realSlug = slug.replace(MDX_FILE, "");
  const fullPath = path.join(CONTENT_PATH, `${realSlug}.${locale}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  return { slug: realSlug, meta: data as MetaProps, content };
}

export function getDocsBySlug(slug: string, locale: string) {
  const docsPath = path.join(CONTENT_PATH, slug);
  const docs = fs
    .readdirSync(docsPath)
    .filter((path) => {
      const isFile = /\.mdx?$/.test(path);
      const fileLocale = path.split(".")[1];
      return isFile && fileLocale === locale;
    })
    .map((fileName) => {
      const file = fileName.replace(/\.mdx?$/, "");
      const fileSlug = slug + "/" + fileName.split(".")[0];
      const fullPath = path.join(docsPath, `${file}.mdx`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { content, data } = matter(fileContents);

      return {
        slug: fileSlug,
        meta: data as MetaProps,
        content,
      };
    });

  return docs;
}

export function getDocsPaths(slug: string): GetStaticPathsResult["paths"] {
  const docsPath = path.join(CONTENT_PATH, slug);
  const docs = fs
    .readdirSync(docsPath)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const slug = fileName.split(".")[0];
      const locale = fileName.split(".")[1];

      return {
        params: {
          id: slug,
        },
        locale,
      };
    });

  return docs;
}
