import convertAndValidateData from "@/utils/convertAndValidateData";
import dictionary from "@/dictionaries/en.json";

test("Validated data is correct. Should return same data object", () => {
  const mockData_DB = [
    {
      data: {
        ADA: 1.5,
        AED: 3.6,
        AFN: 69.6,
        USD: 1,
      },
      id: "657a5ce5597f7c8ccd3e1ef3",
      v: 0,
      date: "2023-12-13",
    },
    {
      data: {
        ADA: 1.6,
        AED: 3.7,
        AFN: 69.8,
        USD: 1,
      },
      id: "657baed9597f7c8ccdca782a",
      v: 0,
      date: "2023-12-14",
    },
    {
      data: {
        ADA: 1.7,
        AED: 3.6,
        AFN: 69.9,
        USD: 1,
      },
      id: "657cffb3597f7c8ccd4de1f9",
      v: 0,
      date: "2023-12-15",
    },
  ];

  const mockData_ExpectedOutput = {
    "2023-12-13": {
      ADA: 1.5,
      AED: 3.6,
      AFN: 69.6,
      USD: 1,
    },
    "2023-12-14": {
      ADA: 1.6,
      AED: 3.7,
      AFN: 69.8,
      USD: 1,
    },
    "2023-12-15": {
      ADA: 1.7,
      AED: 3.6,
      AFN: 69.9,
      USD: 1,
    },
  };

  const validData = convertAndValidateData(mockData_DB, dictionary);

  expect(validData).toStrictEqual(mockData_ExpectedOutput);
});

test("DB data contains data entry that is missing a currency item. Should return data object without missing currency item for every data entry", () => {
  const mockData_DB = [
    {
      data: {
        ADA: 1.5,
        AED: 3.6,
        AFN: 69.8,
        USD: 1,
      },
      id: "657a5ce5597f7c8ccd3e1ef3",
      v: 0,
      date: "2023-12-13",
    },
    {
      data: {
        ADA: 1.6,
        AED: 3.7,
        USD: 1,
      },
      id: "657baed9597f7c8ccdca782a",
      v: 0,
      date: "2023-12-14",
    },
    {
      data: {
        ADA: 1.7,
        AED: 3.6,
        AFN: 69.9,
        USD: 1,
      },
      id: "657cffb3597f7c8ccd4de1f9",
      v: 0,
      date: "2023-12-15",
    },
  ];

  const mockData_ExpectedOutput = {
    "2023-12-13": {
      ADA: 1.5,
      AED: 3.6,
      USD: 1,
    },
    "2023-12-14": {
      ADA: 1.6,
      AED: 3.7,
      USD: 1,
    },
    "2023-12-15": {
      ADA: 1.7,
      AED: 3.6,
      USD: 1,
    },
  };

  // @ts-expect-error
  const invalidData = convertAndValidateData(mockData_DB, dictionary);

  expect(invalidData).toStrictEqual(mockData_ExpectedOutput);
});

test("DB data contains entries that are not present in currencyNames. Should return data present in currencyNames", () => {
  const mockData_DB = [
    {
      data: {
        ADA: 1.5,
        AED: 3.6,
        AFN: 69.6,
        USD: 1,
        FAKE: 3,
      },
      id: "657a5ce5597f7c8ccd3e1ef3",
      v: 0,
      date: "2023-12-13",
    },
    {
      data: {
        ADA: 1.6,
        AED: 3.7,
        AFN: 69.8,
        USD: 1,
        FAKE: 3,
      },
      id: "657baed9597f7c8ccdca782a",
      v: 0,
      date: "2023-12-14",
    },
    {
      data: {
        ADA: 1.7,
        AED: 3.6,
        AFN: 69.9,
        USD: 1,
        FAKE: 3,
      },
      id: "657cffb3597f7c8ccd4de1f9",
      v: 0,
      date: "2023-12-15",
    },
  ];

  const mockData_ExpectedOutput = {
    "2023-12-13": {
      ADA: 1.5,
      AED: 3.6,
      AFN: 69.6,
      USD: 1,
    },
    "2023-12-14": {
      ADA: 1.6,
      AED: 3.7,
      AFN: 69.8,
      USD: 1,
    },
    "2023-12-15": {
      ADA: 1.7,
      AED: 3.6,
      AFN: 69.9,
      USD: 1,
    },
  };

  const invalidData = convertAndValidateData(mockData_DB, dictionary);

  expect(invalidData).toStrictEqual(mockData_ExpectedOutput);
});
