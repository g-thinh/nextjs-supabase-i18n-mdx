import { styled, keyframes } from "@/styles/stitches.config";

const flashing = keyframes({
  "0%": {
    backgroundColor: "white",
  },
  "50%,100%": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});

const Dots = styled("div", {
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
  },

  "&::before": {
    left: -12,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "white",
    color: "white",
    animation: `${flashing} 1s infinite linear alternate`,
    animationDelay: "0s",
  },

  "&::after": {
    left: 12,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "white",
    color: "white",
    animation: `${flashing} 1s infinite linear alternate`,
    animationDelay: "1s",
  },
});

const DotsContainer = styled("div", {
  px: "$3",
  py: "$1",
});

export function LoadingDots() {
  return (
    <DotsContainer>
      <Dots />
    </DotsContainer>
  );
}
