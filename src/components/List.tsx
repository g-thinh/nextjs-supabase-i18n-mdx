import { styled } from "@/styles/stitches.config";

export const List = styled("ul", {
  display: "flex",
  gap: "$4",
  my: "$6",
  variants: {
    type: {
      column: {
        flexDirection: "column",
      },
    },
  },
});

export const ListItem = styled("li", {});
