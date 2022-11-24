import { useEffect, useState } from "react";
import { TOKEN } from "../Environments";

function useProductsCount(filterQuery: string) {
  const [totalCount, setTotalCount] = useState<number>(1);

  useEffect(() => {
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getProductsCount?activePage=1&count=10&productOnly=true&target_marketplace=eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9${filterQuery}`,
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
    )
      .then((resp) => resp.json())
      .then((data) => setTotalCount(data.data?.count))
      .catch((err) => console.log(err));
  }, [filterQuery]);

  return { totalCount };
}

export default useProductsCount;
