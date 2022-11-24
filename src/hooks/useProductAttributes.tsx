import { useEffect, useState } from "react";
import { TOKEN } from "../Environments";

function useProductAttributes() {
  const [productsAttributes, setProductsAttributes] =
    useState<{ label: string; value: string }[]>();

  async function fetchData() {
    const resp = await fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getProductAttributes?target_marketplace=eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9&marketplace=twitter`,
      {
        method: "POST",
        body: JSON.stringify({
          source: {
            shopId: 889,
            marketplace: "shopify",
          },
        }),
        headers: {
          appCode:
            "eyJzaG9waWZ5Ijoic2hvcGlmeV90d2l0dGVyIiwibWFnZW50byI6Im1hZ2VudG9fdHdpdHRlciIsImJpZ2NvbW1lcmNlIjoiYmlnY29tbWVyY2VfdHdpdHRlciIsIndvb2NvbW1lcmNlIjoid29vY29tbWVyY2VfdHdpdHRlciIsInR3aXR0ZXIiOiJ0d2l0dGVyIn0=",
          appTag: "twitter_ads",
          Authorization: `Bearer ${TOKEN}`,
          "Ced-Source-Id": "889",
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": "890",
          "Ced-Target-Name": "twitter",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await resp.json();
    const options: { label: string; value: string }[] = data?.data?.map(
      (opt: any) => {
        return {
          label: opt?.title,
          value: opt?.code,
        };
      }
    );

    const newOption = [{ label: "Set Custom", value: "custom" }, ...options];

    setProductsAttributes(newOption);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { productsAttributes };
}

export default useProductAttributes;
