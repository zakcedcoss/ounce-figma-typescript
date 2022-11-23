import { Card, Select } from "@cedcommerce/ounce-ui";
import { useEffect, useState } from "react";
import SubCategorySelection from "./SubCategorySelection";

interface CategoryType {
  label: string;
  value: string;
  hasChildren: boolean;
  nextLevel: string;
  path: string;
}

function CategorySelection() {
  const [categorySelection, setCategorySelection] = useState<CategoryType>();
  const [category, setCategory] = useState<CategoryType[]>();

  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY5MjA2MDUyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzN2RkN2U0MjRhOTdlMzliNTAxNzY1MiJ9.Z64eO9jTTymWZ7I3Ctyqv8M2PpS5eoq8fGxA0eDb3NAvRGK0nDFKaTlQyGd-TJ6AZx1bwpEGiwndGqcGF1KChStPmWpjbHdgvP-Nrt2hI6emOg9NBTYZY0xJa6KGN69ySAMiBPxrZBhMMVJpVyMIIp7_g8faU0Y9CW9uoD2pbGiq8GG9ideNmqVymE0Du2QP7Qmw3qNeWR7S2c-LaRAsGfKU9o1uf7dBAvx18VMfX1od6k1bh9HbwesvvytH2UxwNCIgnuZkFF_4jkKBEOmoWMpCQJkxVuLNsJvRV2KFX92NZqcu-RabEswFa_xJlJKC_A8GyBrnnUMjSoYrXUxQjA";

  async function fetchCategory() {
    const resp = await fetch(
      `https://multi-account.sellernext.com/home/public/connector/profile/getRootCategory?target_marketplace=eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9&marketplace=twitter`,
      {
        headers: {
          appCode:
            "eyJzaG9waWZ5Ijoic2hvcGlmeV90d2l0dGVyIiwibWFnZW50byI6Im1hZ2VudG9fdHdpdHRlciIsImJpZ2NvbW1lcmNlIjoiYmlnY29tbWVyY2VfdHdpdHRlciIsIndvb2NvbW1lcmNlIjoid29vY29tbWVyY2VfdHdpdHRlciIsInR3aXR0ZXIiOiJ0d2l0dGVyIn0=",
          appTag: "twitter_ads",
          Authorization: `Bearer ${TOKEN}`,
          "Ced-Source-Id": "889",
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": "890",
          "Ced-Target-Name": "twitter",
        },
      }
    );
    const data = await resp.json();

    const categories: CategoryType[] = data?.data?.map((cat: any) => {
      return {
        label: cat?.name,
        value: cat?.category_id,
        hasChildren: cat?.has_children ? true : false,
        nextLevel: cat?.next_level,
        path: cat?.custom_category_path,
      };
    });

    setCategory(categories);
  }

  useEffect(() => {
    fetchCategory();
  }, []);

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
