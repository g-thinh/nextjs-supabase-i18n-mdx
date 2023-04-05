import * as Hero from "@/components/Hero";
import { useTranslation } from "next-i18next";
import { Image } from "./Image";

export function HeroLanding() {
  const { t } = useTranslation(["common"]);
  return (
    <Hero.Root>
      <Image
        ratio={16 / 9}
        priority={true}
        src={"/images/hero-landing.jpg"}
        alt="Photo by https://unsplash.com/@colin_r_carter"
      />
      <Hero.Content>
        <Hero.Title>{t("common:welcome")}</Hero.Title>
      </Hero.Content>
    </Hero.Root>
  );
}
