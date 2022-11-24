import {
  Button,
  Card,
  FlexLayout,
  Select,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import { OptionalOptionType } from "../../../types/types";

function OptionalAttributes() {
  const optionalAttribOptions: OptionalOptionType[] = [
    { label: "Color", options: [] },
    { label: "Size", options: [] },
  ];
  return (
    <Card
      action={<Button type="Outlined">Add Attributes</Button>}
      cardType="Bordered"
      title="Optional Attributes"
      subTitle="This is an optional set of attributes that you may or may not map as per your requirements."
    >
      {optionalAttribOptions.map((opt: OptionalOptionType, i: number) => {
        return (
          <Card cardType="Bordered" key={i}>
            <FlexLayout desktopWidth="50" halign="fill" valign="center">
              <TextStyles alignment="left">{opt.label}</TextStyles>
              <Select options={opt.options} />
            </FlexLayout>
          </Card>
        );
      })}
    </Card>
  );
}

export default OptionalAttributes;
