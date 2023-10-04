import CurrencyExchange from "./components/CurrencyExchange";
import styles from "./page.module.scss";
import { TCurrencyData, TDBCurrencyData, TURLProps } from "../../../types";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

// converting SSR into SSG
// export const revalidate = 864000;

// export function generateStaticParams() {
//   const languages = ["en", "ru"];

//   return languages.map((lang) => ({
//     lang,
//   }));
// }

export default async function Home(props: TURLProps) {
  // url params
  const searchParams = props.searchParams;
  const theme = searchParams.theme;
  const lang: Locale = props.params.lang;

  const dictionary = await getDictionary(lang);

  // fetchign data  from the db
  const currencydata: TDBCurrencyData[] = await fetch(
    `${process.env.SITE_URL!}/api`,
    { cache: "reload" }
  ).then((response) => response.json());

  // converting DB data into app format
  const convertedData: TCurrencyData = {};
  currencydata.map((item) => (convertedData[item.date] = item.data));

  return (
    <main className={`${styles.main} ${theme ? theme : ""}`}>
      <CurrencyExchange data={convertedData} dictionary={dictionary} />
    </main>
  );
}
