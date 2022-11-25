import { Select } from "@cedcommerce/ounce-ui";
import { useEffect, useState } from "react";
import useNextLevelCategory from "../../../hooks/useNextLevelCategory";
import { CategoryType } from "../../../types/types";

interface CategoryProps {
  selectedCategory: CategoryType;
  setCategoryPathMemo: React.Dispatch<React.SetStateAction<string>>;
}

function SubCategorySelection({
  selectedCategory,
  setCategoryPathMemo,
}: CategoryProps) {
  const { category } = useNextLevelCategory(selectedCategory);
  const [categorySelection, setCategorySelection] = useState<CategoryType>();
  console.log(categorySelection, "fsfsdfsdfdf");

  useEffect(() => {
    setCategorySelection({} as CategoryType);
  }, [category]);

  return (
    <>
      <Select
        searchEable={true}
        options={category}
        value={categorySelection?.value}
        onChange={(e, f) => {
          setCategorySelection(f as CategoryType);
        }}
      />
      {categorySelection?.hasChildren ? (
        <SubCategorySelection
          selectedCategory={categorySelection}
          setCategoryPathMemo={setCategoryPathMemo}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default SubCategorySelection;
