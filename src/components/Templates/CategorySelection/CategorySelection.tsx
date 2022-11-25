import { Card, Select, Tag } from "@cedcommerce/ounce-ui";
import { useCallback, useState } from "react";
import useRootCategory from "../../../hooks/useRootCategory";
import { CategoryType } from "../../../types/types";
import SubCategorySelection from "./SubCategorySelection";

function CategorySelection() {
  const { category } = useRootCategory();
  const [categorySelection, setCategorySelection] = useState<CategoryType>();
  const [categoryPath, setCategoryPath] = useState<string>("");
  const setCategoryPathMemo = useCallback(setCategoryPath, []);

  return (
    <Card
      cardType="Bordered"
      title="Category Selection"
      subTitle="Select a category for the product template you wish to create"
    >
      {categoryPath && (
        <Card>
          <Tag>{categoryPath}</Tag>
        </Card>
      )}

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
    </Card>
  );
}

export default CategorySelection;
