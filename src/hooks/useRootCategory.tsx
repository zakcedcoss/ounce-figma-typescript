import { useEffect, useState } from "react";
import { TOKEN } from "../Environments";
import { CategoryType } from "../types/types";

function useRootCategory() {
  const [category, setCategory] = useState<CategoryType[]>();

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

  return { category };
}

export default useRootCategory;
