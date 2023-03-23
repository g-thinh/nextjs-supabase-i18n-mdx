import { useRouter } from "next/router";

export function SelectLocale() {
  const router = useRouter();
  const { pathname, query, asPath, locale, locales } = router;

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({ pathname, query }, asPath, { locale: e.currentTarget.value });
  };

  return (
    <select onChange={handleLocaleChange} defaultValue={locale}>
      {locales?.map((locale) => {
        return <option key={locale}>{locale}</option>;
      })}
    </select>
  );
}
