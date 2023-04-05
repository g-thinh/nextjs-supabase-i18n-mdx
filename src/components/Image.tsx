import NextImage, { ImageProps as NextImageProps } from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { keyframes, styled } from "@/styles/stitches.config";
import { useTranslation } from "next-i18next";

type ImageProps = {
  ratio?: AspectRatio.AspectRatioProps["ratio"];
} & NextImageProps;

const AspectRatioRoot = styled(AspectRatio.Root, {
  position: "relative",
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "0% 0%" },
  "50%": { backgroundPosition: "100% 100%" },
  "100%": { backgroundPosition: "0% 0%" },
});

const Shimmer = styled("div", {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  transition: "opacity 1s ease-out",
  background: `linear-gradient(145deg, hsl(0, 0%, 60%), hsl(0, 0%, 70%), hsl(0, 0%, 85%))`,
  backgroundPosition: "0% 0%",
  backgroundSize: "200% 200%",
  animation: `${shimmer} 1s ease-in-out infinite`,
});

const TextError = styled("span", {});

const ContainerText = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export function Image({ ratio = 1, ...props }: ImageProps) {
  const { t } = useTranslation(["common"]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <AspectRatioRoot ratio={ratio}>
      <>
        {!props.priority && <Shimmer css={{ opacity: isLoading ? 1 : 0 }} />}
        {hasError ? (
          <ContainerText>
            <TextError>{t("common:error.image")}</TextError>
          </ContainerText>
        ) : (
          <NextImage
            fill={true}
            style={{
              objectFit: "fill",
              width: "100%",
              height: "100%",
            }}
            onLoadingComplete={() => setIsLoading(false)}
            onError={handleError}
            {...props}
          />
        )}
      </>
    </AspectRatioRoot>
  );
}
