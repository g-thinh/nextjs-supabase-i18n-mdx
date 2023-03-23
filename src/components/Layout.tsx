import { styled } from "@/styles/stitches.config";

export const CONTENT_WIDTH = "min(120ch,100%)";

export const Layout = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const Content = styled("div", {});

export const Main = styled("main", {
  flex: 1,
  width: "100%",
  maxWidth: CONTENT_WIDTH,
  margin: "0 auto",

  "@lg": {
    display: "grid",
    gridColumnGap: 0,
    gridRowGap: 0,
    gridTemplateColumns: "auto 1fr auto",
  },

  variants: {
    type: {
      full: {
        maxWidth: "100%",
        display: "flex",
      },
    },
  },
});

export const Article = styled("article", {
  width: "100%",
  padding: "$4",
  height: "100%",
});

export const Section = styled("section", {
  maxWidth: CONTENT_WIDTH,
  margin: "0 auto",
  width: "100%",
  height: "100%",
});

export const Aside = styled("aside", {
  margin: "$4",
  width: "10em",
  padding: "$5",
  border: "1px solid lightgray",
  borderRadius: "$md",
  minWidth: "25ch",

  "@lg": {
    position: "sticky",
    alignSelf: "baseline",
    top: "5em",
  },
});

export const Navigation = styled("nav", {
  position: "sticky",
  alignSelf: "baseline",
  top: "4em",
  width: "10em",
  padding: "$5",
  border: "1px solid black",
  minWidth: "25ch",
});

export const Banner = styled("div", {
  width: "100%",
  height: "20vh",
  backgroundColor: "lightgray",

  "& h2": {
    fontSize: "$3xl",
  },
});
