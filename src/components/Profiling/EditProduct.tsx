import {
  BodyLayout,
  Button,
  Card,
  FlexLayout,
  PageHeader,
  TextField,
  TextStyles,
  Toast,
  ToastWrapper,
} from "@cedcommerce/ounce-ui";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSingleProduct from "../../hooks/useSingleProduct";
import { SingleProductType, VariantsType } from "../../types/types";

interface ErrorType {
  [key: string]: boolean;
}

function EditProduct() {
  const { id } = useParams();
  const { product, variants } = useSingleProduct(id);
  const [editedProduct, setEditedProduct] = useState<SingleProductType>(
    {} as SingleProductType
  );
  const [editedVariant, setEditedVariant] = useState<VariantsType[]>();
  // errors
  const [productError, setProductError] = useState<ErrorType>();
  const [variantError, setVariantError] = useState<ErrorType[]>();
  const [globalError, setGlobalError] = useState<boolean>(false);

  useEffect(() => {
    let errorObject: ErrorType = {};
    let variantArray: ErrorType[] = [];
    if (product) {
      Object.keys(product[0]).forEach((product) => {
        errorObject = { ...errorObject, [product]: false };
      });
      setProductError(errorObject);

      variants?.forEach((_, i) => {
        variantArray[i] = { price: false, quantity: false, image: false };
      });
      setVariantError(variantArray);

      setEditedProduct(product[0]);
      setEditedVariant(variants);
    }
  }, [product]);

  const handleEditProducts = (value: string | number, name: string) => {
    setEditedProduct((prev) => {
      return { ...prev, [name]: value };
    });
    setProductError((prev) => {
      if (name === "tags") return { ...prev, tags: false };
      if (value === "") return { ...prev, [name]: true };
      return { ...prev, [name]: false };
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
    setVariantError((prev) => {
      return prev?.map((vrnt, i) => {
        if (i === index) {
          if (value === "") {
            return { ...vrnt, [name]: true };
          }
          return { ...vrnt, [name]: false };
        }
        return vrnt;
      });
    });
  };

  const handleSave = () => {
    let isError: boolean = false;
    if (productError) {
      Object.keys(productError).forEach((key) => {
        if (productError[key]) isError = true;
      });
    }
    if (variantError?.length !== 0) {
      variantError?.forEach((vrnt) => {
        Object.keys(vrnt).forEach((key: string) => {
          if (vrnt[key]) isError = true;
        });
      });
    }

    if (isError) {
      setGlobalError(true);
      return;
    }
    setGlobalError(false);
    console.log({ ...editedProduct, variants: editedVariant });
  };

  return (
    <BodyLayout>
      <PageHeader title={`Edit Products Details`} />
      {globalError && (
        <ToastWrapper>
          <Toast
            message="Please fill all the fields"
            onDismiss={() => setGlobalError(false)}
            timeout={3000}
            type="error"
          />
        </ToastWrapper>
      )}
      <Card>
        <FlexLayout direction="vertical" spacing="loose">
          <TextField
            error={productError?.title}
            name="Title"
            value={editedProduct?.title ?? ""}
            onChange={(e) => handleEditProducts(e, "title")}
          />
          <TextField
            error={productError?.description}
            name="Description"
            value={editedProduct?.description ?? ""}
            onChange={(e) => handleEditProducts(e, "description")}
          />
          <FlexLayout halign="fill" spacing="loose" childWidth="fullWidth">
            {editedProduct?.price !== undefined && (
              <TextField
                error={productError?.price}
                name="Price"
                type="number"
                value={editedProduct?.price ?? 0}
                onChange={(e) => handleEditProducts(e, "price")}
              />
            )}
            {editedProduct?.quantity !== undefined && (
              <TextField
                error={productError?.quantity}
                name="Quantity"
                type="number"
                value={editedProduct?.quantity ?? 0}
                onChange={(e) => handleEditProducts(e, "quantity")}
              />
            )}
          </FlexLayout>
          <TextField
            error={productError?.image}
            name="Main Image Url"
            value={editedProduct?.image ?? ""}
            onChange={(e) => handleEditProducts(e, "image")}
          />
          <FlexLayout halign="fill" spacing="loose" childWidth="fullWidth">
            <TextField
              error={productError?.type}
              name="Type"
              value={editedProduct?.type ?? ""}
              onChange={(e) => handleEditProducts(e, "type")}
            />
            <TextField
              error={productError?.visibility}
              name="Visibility"
              value={editedProduct?.visibility ?? ""}
              onChange={(e) => handleEditProducts(e, "visibility")}
            />
          </FlexLayout>
          <FlexLayout halign="fill" spacing="loose" childWidth="fullWidth">
            <TextField
              error={productError?.sku}
              name="SKU"
              value={editedProduct?.sku ?? ""}
              onChange={(e) => handleEditProducts(e, "sku")}
            />
            <TextField
              error={productError?.source_product_id}
              name="Source Product ID"
              type="number"
              value={editedProduct?.source_product_id ?? ""}
              onChange={(e) => handleEditProducts(e, "source_product_id")}
            />
          </FlexLayout>
          <TextField
            error={productError?.tags}
            name="Tags"
            showHelp="Enter tags separated by comma"
            value={editedProduct?.tags ?? ""}
            onChange={(e) => {
              handleEditProducts(e, "tags");
            }}
          />
          {editedVariant?.map((variant, idx: number) => {
            return (
              <FlexLayout direction="vertical" spacing="loose" key={idx}>
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
                    error={variantError?.[idx]?.price ?? false}
                    name="Price"
                    type="number"
                    value={variant.price ?? 0}
                    onChange={(e) => handleEditedVariants(e, "price", idx)}
                  />
                  <TextField
                    error={variantError?.[idx]?.quantity ?? false}
                    name="Quantity"
                    type="number"
                    value={variant.quantity ?? 0}
                    onChange={(e) => handleEditedVariants(e, "quantity", idx)}
                  />
                </FlexLayout>
                <TextField
                  error={variantError?.[idx]?.image ?? false}
                  name="Variant Image Url"
                  value={variant.image ?? ""}
                  onChange={(e) => handleEditedVariants(e, "image", idx)}
                />
              </FlexLayout>
            );
          })}
          <FlexLayout spacing="loose" halign="end">
            <Button type="Primary" onClick={handleSave}>
              Save
            </Button>
          </FlexLayout>
        </FlexLayout>
      </Card>
    </BodyLayout>
  );
}

export default EditProduct;
