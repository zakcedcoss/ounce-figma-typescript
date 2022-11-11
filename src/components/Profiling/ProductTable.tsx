import {
  Card,
  FlexLayout,
  TextStyles,
  Skeleton,
  Pagination,
} from "@cedcommerce/ounce-ui";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Table, Avatar, Switch } from "antd";
import React, { useEffect, useState } from "react";
//types
import { ProductTablePropsType, ProductsType } from "../../types/types";

function ProductTable({
  page,
  setPage,
  filterQuery,
  selectedRow,
  setSelectedRow,
}: ProductTablePropsType) {
  const [count, setCount] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // token
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY4MTcyMDE5LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNmUxMGIzZjk2NjgzNTQ3YjJlYzg1YiJ9.iiF160u5OWkHZ8qLQzkKDsjytSW8HXaB74ilKW5bVMLqZQ8tvpU676qR1QufbV1NIiQttLATXSyjRmR8mEqaZXsmruNg0hOHb3rBsqHgPWfcpRnLdMo-6Ue1JeaNwLvtPvMx8lVL0nm_8GGtrT1266EfROL0TLIk1NSlnNHyMeauQwYw2J4_1Xae3L8JAOR8V2gHfX9n0efajelGMOnkXo611VQngQ67M5UU2-IyGCCsAMLNVtGa3a5BOt2Y-5CkOEbE6iAreP6hgRLOxJZalIHsh3j-o4he6JORh247QM_Z4FAbozUzVepzA59PuTuYJlXHwsDaw29q3rUPzgXvcA";

  useEffect(() => {
    // we can keep the token in env variable for more security
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
        let newData = allData?.data?.rows?.map((item: any) => {
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
                    if (item["source_product_id"] === val["source_product_id"])
                      return acc + 0;
                    return acc + val.quantity;
                  }, 0)} of ${item.items.reduce((acc: number, val: any) => {
                    if (item["source_product_id"] === val["source_product_id"])
                      return acc + 0;
                    return acc + 1;
                  }, 0)} variant`,
            img: item["main_image"],
          };
        });
        setProducts(newData);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page, count, filterQuery]);

  useEffect(() => {
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getProductsCount?activePage=1&count=10&productOnly=true&target_marketplace=eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9`,
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
  }, []);

  return (
    <div>
      <Card>
        {!isLoading && products?.length !== 0 ? (
          <Table
            columns={[
              {
                align: "left",
                dataIndex: "name",
                key: "name",
                title: " Product Name",
                render: (text: string, record: ProductsType) => {
                  return (
                    <FlexLayout halign="start" spacing="loose">
                      <Avatar src={record?.img} />
                      <TextStyles>{text}</TextStyles>
                    </FlexLayout>
                  );
                },
                width: 500,
              },
              {
                align: "left",
                dataIndex: "sku",
                key: "sku",
                title: "SKU",
                width: 100,
              },
              {
                align: "center",
                dataIndex: "status",
                key: "status",
                title: "Status",
                width: 100,
              },
              {
                align: "center",
                dataIndex: "inventory",
                key: "inventory",
                title: "Inventory",
                width: 200,
              },
              {
                align: "left",
                dataIndex: "offerprime",
                key: "offerprime",
                title: "Offer Prime",
                width: 150,
                render: (_, record: ProductsType) => {
                  return (
                    <FlexLayout
                      direction="vertical"
                      halign="start"
                      spacing="loose"
                    >
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={(e: boolean) => console.log(e, record.key)}
                      />
                      <TextStyles>{record.inventory}</TextStyles>
                    </FlexLayout>
                  );
                },
              },
            ]}
            dataSource={products}
            pagination={false}
            rowSelection={{
              selectedRowKeys: selectedRow[page],
              onChange: (e) => {
                setSelectedRow((oldSelectedRow: any) => {
                  return { ...oldSelectedRow, [page]: e };
                });
              },
            }}
          />
        ) : (
          <Skeleton line={3} rounded="0%" type="line" />
        )}
      </Card>
      {products?.length !== 0 && (
        <Card>
          <Pagination
            countPerPage={count}
            currentPage={page}
            onCountChange={(e: number) => {
              setCount(e);
              setPage(1);
              setSelectedRow({});
            }}
            onEnter={(e: any) => {
              if (e > 0) setPage(e);
            }}
            onNext={() => {
              if (page >= Math.ceil(totalCount / count)) {
                setPage(Math.ceil(totalCount / count));
                return;
              }
              setPage((prevPage: number) => prevPage + 1);
            }}
            onPrevious={() => {
              if (page <= 1) {
                setPage(1);
                return;
              }
              setPage((prevPage: number) => prevPage - 1);
            }}
            optionPerPage={[
              {
                label: "10",
                value: "10",
              },
              {
                label: "20",
                value: "20",
              },
              {
                label: "50",
                value: "50",
              },
              {
                label: "100",
                value: "100",
              },
            ]}
            totalPages={Math.ceil(totalCount / count) || 1}
            totalitem={totalCount || 0}
          />
        </Card>
      )}
    </div>
  );
}

export default ProductTable;
