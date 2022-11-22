import {
  BodyLayout,
  Card,
  PageFooter,
  PageHeader,
  TextStyles,
} from "@cedcommerce/ounce-ui";

function CreateTemplate() {
  return (
    <BodyLayout>
      <PageHeader
        title="Templates"
        description="Templates are used while uploading products on Twitter with a similar set of attributes related to inventory, price, category, or title.
        "
      />
      <Card>Create Template</Card>
      <PageFooter>
        <TextStyles>Cedcommerce @ 2022</TextStyles>
        <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
      </PageFooter>
    </BodyLayout>
  );
}

export default CreateTemplate;
