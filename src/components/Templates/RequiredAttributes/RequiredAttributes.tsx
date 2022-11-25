import {
  Card,
  FlexLayout,
  Select,
  TextField,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import useProductAttributes from "../../../hooks/useProductAttributes";
import { OptionalOptionType } from "../../../types/types";

interface RequiredAttributesProps {
  reqAttribOutput: string[][];
  setReqAttribOutputMemo: React.Dispatch<React.SetStateAction<string[][]>>;
}

function RequiredAttributes({
  reqAttribOutput,
  setReqAttribOutputMemo,
}: RequiredAttributesProps) {
  const { productsAttributes } = useProductAttributes();

  const requiredAttribOptions: OptionalOptionType[] = [
    {
      label: "Condition",
      options: [
        { label: "new", value: "new" },
        { label: "used", value: "used" },
        { label: "refurbished", value: "refurbished" },
      ],
    },
    {
      label: "Gender",
      options: [
        { label: "male", value: "male" },
        { label: "female", value: "female" },
        { label: "unisex", value: "unisex" },
      ],
    },
    {
      label: "Age Group",
      options: [
        { label: "adult", value: "adult" },
        { label: "all ages", value: "all ages" },
        { label: "teen", value: "teen" },
        { label: "kids", value: "kids" },
        { label: "toddler", value: "toddler" },
        { label: "infant", value: "infant" },
        { label: "newborn", value: "newborn" },
      ],
    },
    { label: "Description", options: productsAttributes },
    { label: "Brand", options: productsAttributes },
  ];

  const handleOptionChange = (e: string, _: any, idx: any) => {
    setReqAttribOutputMemo((prev) => {
      return prev.map((opt, i) => {
        if (i === idx && e === "custom") return [e, ""];
        else if (i === idx) return [e, e];
        return opt;
      });
    });
  };

  const handleTextEnter = (e: string, idx: number) => {
    setReqAttribOutputMemo((prev) => {
      return prev.map((opt, i) => {
        if (i === idx) return [opt[0], e];
        return opt;
      });
    });
  };

  return (
    <Card
      cardType="Bordered"
      title="Required Attributes"
      subTitle="Based on the category selected, you need to map Twitter attributes with Shopify attributes."
    >
      <Card cardType="Bordered">
        <FlexLayout desktopWidth="50" halign="fill" valign="center">
          <TextStyles alignment="left">Twitter attributes</TextStyles>
          <TextStyles>Shopify attributes</TextStyles>
        </FlexLayout>
      </Card>
      {requiredAttribOptions.map((opt: OptionalOptionType, i: number) => {
        return (
          <Card cardType="Bordered" key={i}>
            <FlexLayout desktopWidth="50" halign="fill" valign="center">
              <TextStyles alignment="left">{opt.label}</TextStyles>
              <FlexLayout direction="vertical">
                <Select
                  value={reqAttribOutput[i][0]}
                  options={opt.options}
                  onChange={(e, f) => handleOptionChange(e, f, i)}
                />
                {reqAttribOutput[i][0] === "custom" && (
                  <TextField
                    placeHolder="Custom Value"
                    value={reqAttribOutput[i][1]}
                    onChange={(e) => handleTextEnter(e, i)}
                  />
                )}
              </FlexLayout>
            </FlexLayout>
          </Card>
        );
      })}
    </Card>
  );
}

export default RequiredAttributes;
