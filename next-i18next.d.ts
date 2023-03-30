/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import "i18next";

import type common from "./public/locales/en/common.json";
import type form from "./public/locales/en/form.json";

interface Namespaces {
  common: typeof common;
  form: typeof form;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: Namespaces;
  }
}
