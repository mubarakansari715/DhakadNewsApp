import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import CountryList from "../constants/CountryList";

const useContryFilter = () => {
  const [countryList, setCountryList] = useState(CountryList);

  const toggleCountry = useCallback((code) => {
    setCountryList((prev) => {
      return prev.map((item) => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      });
    });
  }, []);

  return { countryList, toggleCountry };
};

export default useContryFilter;
