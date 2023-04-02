import { styled } from "@/styles/stitches.config";
import NextLink from "next/link";
import { Section } from "./Layout";
import { SelectLocale } from "./SelectLocale";
import { useTranslation } from "next-i18next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const Container = styled("header", {
  position: "sticky",
  top: 0,
  display: "flex",
  backgroundColor: "hsl(0,0%,15%)",
  color: "white",
  zIndex: 999,

  h1: {
    fontSize: "$2xl",
    "> a": {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },

  ul: {
    display: "flex",
    gap: "$4",
    alignItems: "center",
  },
});

const StyledLink = styled(NextLink, {
  color: "white",
});

const Button = styled("button", {
  px: "$4",
  height: "2.5em",
  backgroundColor: "hsl(1,0%, 100%)",
  color: "black",
  border: "1px solid black",
  borderRadius: "$md",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "hsl(1,0%,80%)",
  },

  "&:active": {
    backgroundColor: "hsl(1,0%,90%)",
  },
});

export function Header() {
  const { t } = useTranslation(["common"]);
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }

    router.push("/");
  };

  return (
    <Container>
      <Section
        css={{
          display: "flex",
          padding: "1rem",
          flexDirection: "column",
          gap: "$2",
          "@md": {
            padding: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          },
        }}
      >
        <h1>
          <StyledLink href="/">{t("common:title")}</StyledLink>
        </h1>
        <nav>
          <ul>
            <li>
              <SelectLocale />
            </li>
            <li>
              <StyledLink href="/about">{t("header.about")}</StyledLink>
            </li>
            <li>
              <StyledLink href="/blog">{t("header.blog")}</StyledLink>
            </li>
            {user ? (
              <>
                <li>
                  <StyledLink href="/profile">{t("header.profile")}</StyledLink>
                </li>
                <li>
                  <Button onClick={handleSignout}>{t("header.logout")}</Button>
                </li>
              </>
            ) : (
              <li>
                <StyledLink href="/signin"> {t("header.login")}</StyledLink>
              </li>
            )}
          </ul>
        </nav>
      </Section>
    </Container>
  );
}
