import { Document, getDocsByFolder } from "@/utils/docs.api";
import type { NextApiRequest, NextApiResponse } from "next";

export type DocResponse = {
  docs: Document[];
};

export default function docHandler(
  req: NextApiRequest,
  res: NextApiResponse<DocResponse>
) {
  const locale = req.query.lang as string;

  if (!locale) {
    throw new Error("No locale provided in query parameters.");
  }

  const docs = getDocsByFolder("blog", { locale });

  return res.status(200).json({ docs });
}
