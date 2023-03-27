const path = require("path");
const localePath = path.resolve("./public/locales");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },
  localePath,
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
