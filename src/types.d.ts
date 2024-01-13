import { Locale } from "@/i18n-config";

// data entry
type TDataEntry = Record<string, number>;

// data model from DB
type TDBCurrencyData = {
  date: string;
  data: TDataEntry;
};

// data formatted for the app
type TCurrencyData = Record<string, Record<string, number>>;

// data format for the graph
type IDBCurrencyDataTransformResult = Record<string, number | string>;

// props used by server component to access url params
type TURLProps = {
  params: {
    lang: Locale;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

// list of available currencies
type TCurrenciesList = {
  [key: string]: string;
};
