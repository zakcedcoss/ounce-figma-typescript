import { Card, Select } from "@cedcommerce/ounce-ui";
import { useState } from "react";
import useRootCategory from "../../../hooks/useRootCategory";
import { CategoryType } from "../../../types/types";
import SubCategorySelection from "./SubCategorySelection";

function CategorySelection() {
  const [categorySelection, setCategorySelection] = useState<CategoryType>();
  const { category } = useRootCategory();

  return (
    <Card
      cardType="Bordered"
      title="Category Selection"
      subTitle="Select a category for the product template you wish to create"
    >
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
    </Card>
  );
}

export default CategorySelection;
