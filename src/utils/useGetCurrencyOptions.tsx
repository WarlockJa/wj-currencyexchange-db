"use client";
import { useEffect, useState } from "react";
import { TCurrenciesList, TDataEntry } from "@/types";

const useGetCurrencyOptions = ({
  data,
  dictionary,
}: {
  data: TDataEntry;
  dictionary: TCurrenciesList;
}) => {
  const [currencyOptions, setCurrencyOptions] = useState<JSX.Element[]>();

  useEffect(() => {
    // creating list of options based on available translations for the data with fallback as EN
    setCurrencyOptions(
      Object.entries(data)
        .map((item) => (
          <option key={item[0]} value={item[0]}>
            {dictionary[item[0]]}
          </option>
        ))
        .sort((a, b) => (a.props.children >= b.props.children ? 1 : -1))
    );
  }, [dictionary, data]);

  return currencyOptions;
};

export default useGetCurrencyOptions;
