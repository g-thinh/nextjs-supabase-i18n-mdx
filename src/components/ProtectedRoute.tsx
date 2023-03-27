import { Article, Main, Section } from "@/components/Layout";
import { LoadingDots } from "@/components/LoadingDots";
import { useUser } from "@supabase/auth-helpers-react";
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useEffect } from "react";

type ProtectedRouteProps = React.PropsWithChildren<{
  redirectTo?: Url;
}>;

export function ProtectedRoute({
  children,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(redirectTo);
    }
  }, [router, user, redirectTo]);

  if (!user) {
    return (
      <Main type="full" css={{ alignItems: "center" }}>
        <Article>
          <Section
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <LoadingDots type="large" />
          </Section>
        </Article>
      </Main>
    );
  }

  return <>{children}</>;
}
