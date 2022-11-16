import {
  Card,
  Button,
  FlexLayout,
  TextStyles,
  PageFooter,
  BodyLayout,
  PageHeader,
  Tabs,
} from "@cedcommerce/ounce-ui";
import { useState } from "react";
function Templates() {
  const [selectedTab, setSelectedTab] = useState("default");

  return (
    <BodyLayout>
      <PageHeader
        title="Templates"
        description="Templates are used while uploading products on Twitter with a similar set of attributes related to inventory, price, category, or title.
        "
      />
      <Card>
        <Tabs
          alignment="vertical"
          onChange={(e) => {
            console.log(e);
            setSelectedTab(e);
          }}
          selected={selectedTab}
          value={[
            {
              content: "Default Template",
              id: "default",
            },
            {
              content: "Custom Template",
              id: "custom",
            },
          ]}
        >
          {selectedTab === "default" ? (
            <Card
              title="Default Template"
              secondaryAction={{
                content: "Edit Default Template",
                type: "Outlined",
              }}
            >
              The default template is usually created at the time of onboarding.
              It gets automatically selected if no custom template is assigned
              or selected.
            </Card>
          ) : (
            <>
              <Card
                title="Custom Template"
                primaryAction={{
                  content: "+ Add New Template",
                  type: "Primary",
                }}
              >
                Customized templates allow you to create a template as per your
                requirements.
              </Card>
              <Card
                title="Template Check"
                primaryAction={{
                  content: "Delete Template",
                  type: "DangerOutlined",
                }}
                secondaryAction={{
                  content: "Edit Template",
                  type: "Outlined",
                }}
              >
                <TextStyles>Applied to 15 product(s)</TextStyles>
                <TextStyles>
                  Query - ( product_type equals Necklace,Bracelet )
                </TextStyles>
              </Card>
            </>
          )}
        </Tabs>
      </Card>
      <PageFooter>
        <TextStyles>Cedcommerce @ 2022</TextStyles>
        <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
      </PageFooter>
    </BodyLayout>
  );
}

export default Templates;
