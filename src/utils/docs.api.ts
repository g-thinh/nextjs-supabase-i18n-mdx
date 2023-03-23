import path from "path";
import fs from "fs";
import matter from "gray-matter";

export function getDocBySlug(slug: string, locale: string) {
  const contentDir = path.join(process.cwd(), "/src/content");
  const realSlug = slug.replace(/\.mdx$/, "");
  console.log("mySlug", slug);
  const fullPath = path.join(contentDir, `${realSlug}.${locale}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}
