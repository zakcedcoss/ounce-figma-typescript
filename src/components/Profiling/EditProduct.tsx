import {
  BodyLayout,
  Button,
  Card,
  FlexLayout,
  PageHeader,
  Tag,
  TextField,
  TextStyles,
} from "@cedcommerce/ounce-ui";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSingleProduct from "../../hooks/useSingleProduct";
import { SingleProductType, VariantsType } from "../../types/types";

function EditProduct() {
  const { id } = useParams();
  const { product, variants } = useSingleProduct(id);
  const [editedProduct, setEditedProduct] = useState<SingleProductType>(
    {} as SingleProductType
  );
  const [editedVariant, setEditedVariant] = useState<VariantsType[]>();
  //   console.log({ editedProduct, editedVariant }, "editedProduct");

  useEffect(() => {
    if (product) {
      setEditedProduct(product[0]);
      setEditedVariant(variants);
    }
  }, [product]);

  const handleEditProducts = (value: string | number, name: string) => {
    setEditedProduct((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleEditedVariants = (
    value: string | number,
    name: string,
    index: number
  ) => {
    setEditedVariant((prev) => {
      return prev?.map((vrnt, i) => {
        if (i === index) {
          return { ...vrnt, [name]: value };
        }
        return vrnt;
      });
    });
  };

  return (
    <BodyLayout>
      <PageHeader title={`Edit Products Details`} />
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
            {editedProduct?.price !== undefined && (
              <TextField
                name="Price"
                type="number"
                value={editedProduct?.price}
                onChange={(e) => handleEditProducts(+e, "price")}
              />
            )}
            {editedProduct?.quantity !== undefined && (
              <TextField
                name="Quantity"
                type="number"
                value={editedProduct?.quantity}
                onChange={(e) => handleEditProducts(+e, "quantity")}
              />
            )}
          </FlexLayout>
          <TextField
            name="Main Image Url"
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
            showHelp="Enter tags separated by comma"
            value={editedProduct?.tags}
            onChange={(e) => {
              handleEditProducts(e, "tags");
            }}
          />
          {editedVariant?.map((variant, idx: number) => {
            return (
              <FlexLayout direction="vertical" spacing="loose">
                <TextStyles>
                  Variant: {variant.attributes[0].key}--
                  {variant.attributes[0].value}
                </TextStyles>
                <FlexLayout
                  halign="fill"
                  spacing="loose"
                  childWidth="fullWidth"
                >
                  <TextField
                    name="Price"
                    type="number"
                    value={variant.price}
                    onChange={(e) => handleEditedVariants(+e, "price", idx)}
                  />
                  <TextField
                    name="Quantity"
                    type="number"
                    value={variant.quantity}
                    onChange={(e) => handleEditedVariants(+e, "quantity", idx)}
                  />
                </FlexLayout>
                <TextField
                  name="Variant Image Url"
                  value={variant.image}
                  onChange={(e) => handleEditedVariants(e, "image", idx)}
                />
              </FlexLayout>
            );
          })}
          <FlexLayout spacing="loose" halign="end">
            <Button
              type="Primary"
              onClick={() =>
                console.log({ ...editedProduct, variants: editedVariant })
              }
            >
              Save
            </Button>
          </FlexLayout>
        </FlexLayout>
      </Card>
    </BodyLayout>
  );
}

export default EditProduct;
