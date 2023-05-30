import { DocResponse } from "@/pages/api/doc";
import { Document, Folder } from "@/utils/docs.api";
import { useEffect, useState } from "react";

export function usePosts(folder: Folder) {
  const [posts, setPosts] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("/api/doc?lang=en");
      const result: DocResponse = await response.json();

      if (response.ok) {
        setPosts(result.docs);
      }

      setLoading(false);
    }
    getPosts();
  }, []);

  return { posts, loading };
}
