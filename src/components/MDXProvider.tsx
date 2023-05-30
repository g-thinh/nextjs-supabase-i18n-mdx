import { MDXProvider } from "@mdx-js/react";
import { Props } from "@mdx-js/react/lib";
import * as List from "@/components/List";
import { Image } from "./Image";

const globalComponents: Props["components"] = {
  List,
  Image,
};

export function MDXGlobalProvider({ children }: React.PropsWithChildren<{}>) {
  return <MDXProvider components={globalComponents}>{children}</MDXProvider>;
}
