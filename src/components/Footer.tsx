import { styled } from "@/styles/stitches.config";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { Section } from "./Layout";

const Container = styled("footer", {
  backgroundColor: "hsl(0,0%,10%)",
  color: "white",
  py: "$6",
});

const Stack = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$2",
  fontSize: "$sm",
});

const StyledLink = styled(NextLink, {
  display: "flex",
  alignItems: "center",
  gap: "$2",
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },

  "&:visited": {
    color: "white",
  },
});

export function Footer() {
  const { t } = useTranslation(["common"]);
  return (
    <Container css={{ mt: "$24" }}>
      <Section>
        <Stack>
          <p>{t("common:title")}</p>
          <div>{t("common:footer.text")}</div>
          <StyledLink
            href="https://github.com/g-thinh/nextjs-payloadcms-monorepo"
            target="_blank"
          >
            <GitHubLogoIcon />
            <span>Github</span>
          </StyledLink>
        </Stack>
      </Section>
    </Container>
  );
}
