import { useEffect, useState } from "react";
import { TOKEN } from "../Environments";
import { SingleProductType, VariantsType } from "../types/types";

function useSingleProduct(container_id: string | undefined) {
  const [product, setProduct] = useState<SingleProductType[]>();
  const [variants, setVariants] = useState<VariantsType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ isError: boolean; message: string }>();

  const fetchSingleProducts = () => {
    setIsLoading(true);
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getProduct?target_marketplace=twitter&source_marketplace=shopify&sourceShopID=889&targetShopID=890&container_id=${container_id}`,
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
        // console.log(allData, "dfdfdf4df");

        if (allData.success) {
          const variants = allData.data.rows
            .filter((data: any) => {
              return (
                data.type !== "variant" &&
                data.visibility !== "Catalog and Search"
              );
            })
            .map((data: any) => {
              return {
                attributes: data.variant_attributes,
                price: data.price,
                quantity: data.quantity,
                image: data.variant_image,
              };
            });

          const newData = allData.data.rows.map((data: any) => {
            return {
              container_id: data.container_id,
              description: data.description,
              image: data.main_image,
              title: data.title,
              sku: data.sku,
              price: data.price,
              quantity: data.quantity,
              tags: data.tags,
              type: data.type,
              source_product_id: data.source_product_id,
              visibility: data.visibility,
            };
          });
          setError({ isError: false, message: allData.message });
          setProduct(newData);
          setVariants(variants);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError({ isError: true, message: allData.message.split(":")[0] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (container_id) {
      fetchSingleProducts();
    }
  }, [container_id]);

  return { product, variants, isLoading, error };
}

export default useSingleProduct;
