import { useEffect, useState } from "react";
import { TOKEN } from "../Environments";
import { ProductsType } from "../types/types";

function useProducts(page: number, count: number, filterQuery: string) {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ isError: boolean; message: string }>();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?activePage=${page}&count=${count}&productOnly=true${filterQuery}`,
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
      .then((allData) => {
        if (allData.success) {
          const newData = allData?.data?.rows?.map((item: any) => {
            return {
              key: item._id["$oid"],
              name: item["title"],
              sku:
                item["source_product_id"] === item.items[0]["source_product_id"]
                  ? item.items[0].sku
                  : "NA",
              status: item.items[0]?.status || item.items[1]?.status,
              inventory:
                item.type === "simple"
                  ? `${item.items[0].quantity} in stock`
                  : `${item.items.reduce((acc: number, val: any) => {
                      if (
                        item["source_product_id"] === val["source_product_id"]
                      )
                        return acc + 0;
                      return acc + val.quantity;
                    }, 0)} of ${item.items.reduce((acc: number, val: any) => {
                      if (
                        item["source_product_id"] === val["source_product_id"]
                      )
                        return acc + 0;
                      return acc + 1;
                    }, 0)} variant`,
              img: item["main_image"],
              container_id: item.container_id,
            };
          });
          setError({ isError: false, message: allData.message });
          setProducts(newData);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError({ isError: true, message: allData.message.split(":")[0] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, count, filterQuery]);

  return { products, isLoading, error };
}

export default useProducts;
