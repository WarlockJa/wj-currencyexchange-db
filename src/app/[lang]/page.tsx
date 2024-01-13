import CurrencyExchange from "@/app/[lang]/components/CurrencyExchange";
import styles from "./page.module.scss";
import { TDBCurrencyData, TURLProps } from "@/types";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/utils/get-dictionary";
import convertAndValidateData from "@/utils/convertAndValidateData";

// converting SSR into SSG
export const revalidate = 864000;

export function generateStaticParams() {
  const languages = ["en", "ru"];

  return languages.map((lang) => ({
    lang,
  }));
}

export default async function Home(props: TURLProps) {
  // url params
  const searchParams = props.searchParams;
  const theme = searchParams.theme;
  const lang: Locale = props.params.lang;

  // getting translated interface
  const dictionary = await getDictionary(lang);

  if (!process.env.SITE_URL)
    throw new Error("SITE_URL environmental variable is not defined");

  // fetching data from the db
  const currencydata: TDBCurrencyData[] = await fetch(
    `${process.env.SITE_URL}/api`
    // { cache: "no-store" }
  )
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });

  // validating and converting DB data into app format
  const convertedValidData = convertAndValidateData(currencydata, dictionary);

  return (
    <main className={`${styles.main} ${theme ? theme : ""}`}>
      <CurrencyExchange data={convertedValidData} dictionary={dictionary} />
    </main>
  );
}
