import { css, keyframes, styled } from "@/styles/stitches.config";
import type * as Stitches from "@stitches/react";

const flashing = keyframes({
  "0%": {
    backgroundColor: "white",
  },
  "50%,100%": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});

const DotsCss = css({
  position: "relative",
  width: 8,
  height: 8,
  borderRadius: 5,
  backgroundColor: "white",
  color: "white",
  animation: `${flashing} 1s infinite linear alternate`,
  animationDelay: "0.5s",

  "&::before, &::after": {
    content: "",
    display: "inline-block",
    position: "absolute",
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "white",
    color: "white",
    animation: `${flashing} 1s infinite linear alternate`,
  },

  "&::before": {
    left: -12,
    animationDelay: "0s",
  },

  "&::after": {
    left: 12,
    animationDelay: "1s",
  },
});

const Dots = styled("div", DotsCss, {
  variants: {
    type: {
      large: {
        width: 14,
        height: 14,
        borderRadius: "$full",

        "&::before, &::after": {
          content: "",
          display: "inline-block",
          position: "absolute",
          top: 0,
          width: 14,
          height: 14,
          borderRadius: "$full",
          backgroundColor: "white",
          color: "white",
          animation: `${flashing} 1s infinite linear alternate`,
        },

        "&::before": {
          left: -24,
          animationDelay: "0s",
        },
        "&::after": {
          left: 24,
          animationDelay: "1s",
        },
      },
    },
  },
});

const DotsContainer = styled("div", {
  px: "$3",
  py: "$1",
});

type DotsVariants = Stitches.VariantProps<typeof Dots>;

type LoadingDotsProps = {
  type?: DotsVariants["type"];
};

export function LoadingDots({ type }: LoadingDotsProps) {
  return (
    <DotsContainer>
      <Dots type={type} />
    </DotsContainer>
  );
}
