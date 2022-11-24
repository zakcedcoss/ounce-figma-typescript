import { Select } from "@cedcommerce/ounce-ui";
import { useEffect, useState } from "react";
import useNextLevelCategory from "../../../hooks/useNextLevelCategory";
import { CategoryType } from "../../../types/types";

interface CategoryProps {
  selectedCategory: CategoryType;
}

function SubCategorySelection({ selectedCategory }: CategoryProps) {
  const [categorySelection, setCategorySelection] = useState<CategoryType>();
  const { category } = useNextLevelCategory(selectedCategory);

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
        <SubCategorySelection selectedCategory={categorySelection} />
      ) : (
        <></>
      )}
    </>
  );
}

export default SubCategorySelection;
