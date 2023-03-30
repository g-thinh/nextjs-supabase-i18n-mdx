import { styled } from "@/styles/stitches.config";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$3",
  border: "1px solid black",
  borderRadius: "$md",
  width: "fit-content",
  maxWidth: "min($md, 100%)",
  mx: "auto",
  my: "$10",
  px: "$4",
  py: "$6",

  "> h2": {
    fontSize: "$lg",
    fontWeight: "bold",
  },
  "> p": {
    fontSize: "$sm",
  },
});

export const Row = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
});

export const Label = styled("label", {
  fontSize: "$xs",
  fontWeight: "$semibold",
  textTransform: "uppercase",
});

export const Input = styled("input", {
  padding: "$2",
  width: "min($sm, 100%)",
});

export const TextError = styled("p", {
  fontSize: "$sm",
  color: "red",
});

export const TextFooter = styled("p", {
  fontSize: "$sm",
});

export const ButtonSubmit = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  px: "$4",
  height: "2.5em",
  backgroundColor: "hsl(0,0%, 0%)",
  color: "white",
  border: "1px solid black",
  borderRadius: "$md",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "hsl(0,0%,20%)",
  },

  "&:active": {
    backgroundColor: "hsl(0,0%,10%)",
  },
});
