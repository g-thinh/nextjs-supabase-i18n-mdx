import { usePosts } from "@/hooks/usePosts";
import Card from "./Card";
import { List } from "./List";
import { LoadingDots } from "./LoadingDots";

export function LatestPosts() {
  const { posts, loading } = usePosts("blog");

  if (loading) {
    return <LoadingDots />;
  }

  return (
    <List type="column">
      {posts.map((post) => {
        return <Card key={post.slug}>{post.meta.title}</Card>;
      })}
    </List>
  );
}
