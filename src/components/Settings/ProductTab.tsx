import { Card, CheckBox } from "@cedcommerce/ounce-ui";

function ProductTab() {
  return (
    <Card
      title="Product"
      primaryAction={{
        content: "Save",
        type: "Primary",
      }}
    >
      <CheckBox labelVal="Product Sync" name="Name" onClick={() => {}} />
    </Card>
  );
}

export default ProductTab;
