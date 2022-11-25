import {
  Card,
  FlexLayout,
  TextStyles,
  Skeleton,
  Pagination,
  ToastWrapper,
  Toast,
} from "@cedcommerce/ounce-ui";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Table, Avatar, Switch } from "antd";
import { useState } from "react";
//types
import { ProductTablePropsType, ProductsType } from "../../types/types";
//custom hooks
import useProducts from "../../hooks/useProducts";
import useProductsCount from "../../hooks/useProductsCount";

function ProductTable({
  page,
  setPage,
  filterQuery,
  selectedRow,
  setSelectedRow,
}: ProductTablePropsType) {
  const [count, setCount] = useState<number>(10);
  const { products, isLoading, error } = useProducts(page, count, filterQuery);
  const { totalCount } = useProductsCount(filterQuery);
  console.log(error, isLoading);

  return (
    <div>
      {error?.isError && (
        <ToastWrapper>
          <Toast
            message={error?.message}
            timeout={1000}
            onDismiss={() => {}}
            type="error"
          />
        </ToastWrapper>
      )}
      <Card>
        {!isLoading && products ? (
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
              selectedRowKeys: Object.keys(selectedRow).reduce(
                (acc: string[], row: string) => {
                  return [...acc, ...selectedRow[+row]];
                },
                []
              ),
              onChange: (e) => {
                setSelectedRow((oldSelectedRow: any) => {
                  return { ...oldSelectedRow, [page]: e };
                });
              },
            }}
          />
        ) : (
          <>
            <Skeleton line={3} rounded="0%" type="line" />
          </>
        )}
      </Card>
      {products && products?.length !== 0 && (
        <Card>
          <Pagination
            countPerPage={count}
            currentPage={page}
            onCountChange={(e: number) => {
              setCount(e);
              setPage(1);
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
            totalPages={Math.ceil(totalCount / count)}
            totalitem={totalCount === 0 ? 1 : totalCount}
          />
        </Card>
      )}
    </div>
  );
}

export default ProductTable;
