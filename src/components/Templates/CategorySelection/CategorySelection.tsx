import { Card, FlexLayout, Select, Tag } from "@cedcommerce/ounce-ui";
import React, { useState } from "react";
import useRootCategory from "../../../hooks/useRootCategory";
import { CategoryType } from "../../../types/types";
import SubCategorySelection from "./SubCategorySelection";

interface RootCategoryProps {
  categoryPath: string;
  setCategoryPathMemo: React.Dispatch<React.SetStateAction<string>>;
}

function CategorySelection({
  categoryPath,
  setCategoryPathMemo,
}: RootCategoryProps) {
  const { category } = useRootCategory();
  const [categorySelection, setCategorySelection] = useState<CategoryType>();

  return (
    <Card
      cardType="Bordered"
      title="Category Selection"
      subTitle="Select a category for the product template you wish to create"
    >
      {categoryPath && (
        <FlexLayout>
          <Tag>{categoryPath}</Tag>
        </FlexLayout>
      )}
      <Select
        searchEable={true}
        options={category}
        value={categorySelection?.value}
        onChange={(e, f) => {
          const x = { ...(f as CategoryType) };
          setCategoryPathMemo(x?.path as string);
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
