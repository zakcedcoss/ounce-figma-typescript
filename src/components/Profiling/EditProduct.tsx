import {
  BodyLayout,
  Button,
  Card,
  FlexLayout,
  PageHeader,
  Tag,
  TextField,
} from "@cedcommerce/ounce-ui";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSingleProduct from "../../hooks/useSingleProduct";
import { SingleProductType } from "../../types/types";

function EditProduct() {
  const { id } = useParams();
  const { product } = useSingleProduct(id);
  const [editedProduct, setEditedProduct] = useState<SingleProductType>(
    {} as SingleProductType
  );
  //   console.log(editedProduct, "editedProduct");

  useEffect(() => {
    if (product) {
      setEditedProduct(product[0]);
    }
  }, [product]);

  const handleEditProducts = (value: string, name: string) => {
    setEditedProduct((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <BodyLayout>
      <PageHeader title={`Edit Products Details ${id}`} />
      <Card>
        <FlexLayout direction="vertical" spacing="loose">
          <TextField
            name="Title"
            value={editedProduct?.title}
            onChange={(e) => handleEditProducts(e, "title")}
          />
          <TextField
            name="Description"
            value={editedProduct?.description}
            onChange={(e) => handleEditProducts(e, "description")}
          />
          <FlexLayout halign="fill" spacing="loose" childWidth="fullWidth">
            {editedProduct?.price && (
              <TextField
                name="Price"
                type="number"
                value={editedProduct?.price}
                onChange={(e) => handleEditProducts(e, "price")}
              />
            )}
            {editedProduct?.quantity && (
              <TextField
                name="Quantity"
                type="number"
                value={editedProduct?.quantity}
                onChange={(e) => handleEditProducts(e, "quantity")}
              />
            )}
          </FlexLayout>
          <TextField
            name="Image Url"
            value={editedProduct?.image}
            onChange={(e) => handleEditProducts(e, "image")}
          />
          <FlexLayout halign="fill" spacing="loose" childWidth="fullWidth">
            <TextField
              name="Type"
              value={editedProduct?.type}
              onChange={(e) => handleEditProducts(e, "type")}
            />
            <TextField
              name="Visibility"
              value={editedProduct?.visibility}
              onChange={(e) => handleEditProducts(e, "visibility")}
            />
          </FlexLayout>
          <FlexLayout halign="fill" spacing="loose" childWidth="fullWidth">
            <TextField
              name="SKU"
              value={editedProduct?.sku}
              onChange={(e) => handleEditProducts(e, "sku")}
            />
            <TextField
              name="Source Product ID"
              type="number"
              value={editedProduct?.source_product_id}
              onChange={(e) => handleEditProducts(e, "source_product_id")}
            />
          </FlexLayout>
          <TextField
            name="Tags"
            value={editedProduct?.tags}
            onChange={(e) => {
              handleEditProducts(e, "tags");
            }}
          />
          {editedProduct.type === "variation" && (
            <>
              <FlexLayout direction="vertical">
                <TextField
                  name="Variant Attributes"
                  value={JSON.stringify(editedProduct?.variant_attributes)}
                />
                <FlexLayout>
                  {editedProduct?.variant_attributes.map((attrib) => {
                    return <Tag destroy={() => {}}>{attrib}</Tag>;
                  })}
                </FlexLayout>
              </FlexLayout>
            </>
          )}
          <FlexLayout spacing="loose" halign="end">
            <Button type="Primary" onClick={() => console.log(editedProduct)}>
              Save
            </Button>
          </FlexLayout>
        </FlexLayout>
      </Card>
    </BodyLayout>
  );
}

export default EditProduct;
