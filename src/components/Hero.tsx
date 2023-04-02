import { styled } from "@/styles/stitches.config";

export const Root = styled("div", {
  position: "relative",
  zIndex: 50,
  overflow: "hidden",
  height: "auto",

  "@lg": {
    maxHeight: "70vh",
  },
});

export const Title = styled("h2", {
  fontSize: "$xl",
  color: "white",
  textAlign: "center",
  px: "$4",

  "@sm": {
    fontSize: "$2xl",
  },

  "@md": {
    fontSize: "$3xl",
  },

  "@lg": {
    fontSize: "$4xl",
  },
});

export const Content = styled("div", {
  position: "absolute",
  zIndex: 60,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundBlendMode: "multiply",
});
