import fs from "fs";
import matter from "gray-matter";
import { GetStaticPathsResult } from "next/types";
import path from "path";

type MetaProps = {
  title: string;
};

type Options = {
  locale: string;
};

export type Document = {
  slug: string;
  meta: MetaProps;
  content: string;
};

export type Folder = "blog" | "/";

const CONTENT_PATH = path.join(process.cwd(), "/src/content");
const MDX_REGEX = new RegExp(/\.mdx$/);

/**
 * Filesystem utility to read a single MDX file
 */
export function getDocBySlug(slug: string, options: Options): Document {
  const realSlug = slug.replace(MDX_REGEX, "");
  const fullPath = path.join(CONTENT_PATH, `${realSlug}.${options.locale}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  return { slug: realSlug, meta: data as MetaProps, content };
}

/**
 * Filesystem utility to read multiple MDX files from a folder
 * @param slug
 * @param locale
 */
export function getDocsByFolder(folder: Folder, options: Options): Document[] {
  const docsPath = path.join(CONTENT_PATH, folder);
  const docs = fs
    .readdirSync(docsPath)
    .filter((filePath) => {
      const isFile = MDX_REGEX.test(filePath);
      const fileLocale = filePath.split(".")[1];
      return isFile && fileLocale === options.locale;
    })
    .map((fileName) => {
      const name = fileName.split(".")[0];
      const slug = path.join(folder, name);
      const fullPath = path.join(docsPath, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { content, data } = matter(fileContents);

      return {
        slug,
        meta: data as MetaProps,
        content,
      };
    });

  return docs;
}

/**
 * Filesystem utility for Next.js rendering with getStaticPaths, returns all possible paths from a folder
 */
export function getDocsPaths(folder: Folder): GetStaticPathsResult["paths"] {
  const docsPath = path.join(CONTENT_PATH, folder);
  const docs = fs
    .readdirSync(docsPath)
    .filter((path) => MDX_REGEX.test(path))
    .map((fileName) => {
      // de-structure filename i.e. first-post.en.mdx => ['first-post', 'en','mdx']
      const name = fileName.split(".")[0];
      const locale = fileName.split(".")[1];

      return {
        params: {
          id: name,
        },
        locale,
      };
    });

  return docs;
}
