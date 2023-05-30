import { styled } from "@/styles/stitches.config";
import type * as Stitches from "@stitches/react";

export const Container = styled("div", {
  border: "1px solid black",
  borderRadius: "$md",
  p: "$4",
  width: "auto",
  maxWidth: "fit-content",
});

type ContainerProps = Stitches.ComponentProps<typeof Container>;

export default function Card({
  children,
  ...props
}: React.PropsWithChildren<ContainerProps>) {
  return <Container {...props}>{children}</Container>;
}

Card.Content = styled("div", {});
Card.Title = styled("span", {});
