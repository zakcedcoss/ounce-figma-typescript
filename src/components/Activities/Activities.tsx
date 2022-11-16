import {
  TextStyles,
  PageFooter,
  BodyLayout,
  PageHeader,
} from "@cedcommerce/ounce-ui";

function Activities() {
  return (
    <BodyLayout>
      <PageHeader title="Activities" />
      <div
        style={{
          marginTop: "7rem",
        }}
      ></div>
      <PageFooter>
        <TextStyles>Cedcommerce @ 2022</TextStyles>
        <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
      </PageFooter>
    </BodyLayout>
  );
}

export default Activities;
