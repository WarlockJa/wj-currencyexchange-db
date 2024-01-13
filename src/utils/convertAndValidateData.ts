import { TCurrencyData, TDBCurrencyData, TDataEntry } from "@/types";

// converting data from DB to app format and validating it
export default function convertAndValidateData(
  data: TDBCurrencyData[],
  dictionary: { [key: string]: string }
) {
  const convertedData: TCurrencyData = {};
  try {
    data.map((item) => {
      return (convertedData[item.date] = item.data);
    });
  } catch (error) {
    throw new Error("Data fetched from the database is invalid");
  }

  // validating data in case CurrencyAPI decided to change data it delivers from
  // the endpoint without changing its version or sending a warning (again...)
  // Initialize an array to store common fields
  let commonFields = [];

  // Get the keys of the first object
  const firstObjectKeys = Object.keys(
    convertedData[Object.keys(convertedData)[0]]
  );
  commonFields = firstObjectKeys;

  // Iterate through the rest of the objects to filter common fields
  // fields that are a number and fields found in the translation dictionary
  for (const date in convertedData) {
    commonFields = commonFields.filter(
      (field) =>
        convertedData[date].hasOwnProperty(field) &&
        typeof convertedData[date][field] === "number" &&
        dictionary.hasOwnProperty(field)
    );
  }

  // Create a new object with entries containing only common fields
  const convertedValidData: TCurrencyData = {};
  for (const date in convertedData) {
    const newObj: TDataEntry = {};
    commonFields.forEach((field) => {
      newObj[field] = convertedData[date][field];
    });
    convertedValidData[date] = newObj;
  }

  return convertedValidData;
}
