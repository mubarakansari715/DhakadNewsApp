import { useCallback, useState } from "react";
import newsCategoryList from "../constants/CategoriesList";

const useCategoryFilter = () => {
  const [newsList, setNewsList] = useState(newsCategoryList);

  const toggleCategory = useCallback((id) => {
    setNewsList((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
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
        return item;
      });
    });
  }, []);

  return {
    newsList,
    toggleCategory,
  };
};

export default useCategoryFilter;
