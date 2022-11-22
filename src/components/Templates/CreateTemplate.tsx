import {
  Accordion,
  BodyLayout,
  Button,
  Card,
  CheckBox,
  FlexLayout,
  List,
  PageFooter,
  PageHeader,
  Select,
  Tabs,
  TextField,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import { useEffect, useState } from "react";

interface OptionsType {
  label: string;
  options: any;
}

function CreateTemplate() {
  const requiredAttribOptions: OptionsType[] = [
    { label: "Condition", options: [] },
    { label: "Gender", options: [] },
    { label: "Age Group", options: [] },
    { label: "Description", options: [] },
    { label: "Brand", options: [] },
  ];
  const optionalAttribOptions: OptionsType[] = [
    { label: "Color", options: [] },
    { label: "Size", options: [] },
  ];
  const [selected, setSelected] = useState<string>("general");
  const [category, setCategory] =
    useState<{ label: string; value: string }[]>();
  const [overrideProducts, setOverrideProducts] = useState<boolean>(false);
  const [openProductGuide, setOpenProductGuide] = useState<boolean>(false);
  const [categorySelection, setCategorySelection] = useState<string>("");
  const [templateName, setTemplateName] = useState<string>("");

  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY5MTIyNDY0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzN2M5MTYwZTNkNDdmMjU4MTVmMzI1MiJ9.OW2gPZjWdP7iTJQ8DmJGntHP_R6S3oLQvYR2rAaroGjIS-blfHtDYWz0_KekTsbPV3yfQxuQrw4KY-9E8lsjV4SKnViToRIEASEfk68QASoUK8yEPAuk1ku1k64pUxAL6RWCOBTj2EQliE9XgWuoVrakBCm6mjxfAe3IMEALcqqUTcNF5g-tJwvoZkv53vCOIFfTelT3ZiJXTMf0SdLvAAPhIMMzFZgOghWBLm_acU7v3V5ikD5gVs72RaIJ-SOdbrMbQxlSCbQcJycyPX4uq4XMvII9-ck6GiXo6hYE5-pRaDBFGf5r7CKVCT5VxYZc-PbMxFuYnGw19ObhjHDtkQ";

  async function fetchCategory() {
    const resp = await fetch(
      `https://multi-account.sellernext.com/home/public/connector/profile/getRootCategory?target_marketplace=eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9&marketplace=twitter`,
      {
        headers: {
          appCode:
            "eyJzaG9waWZ5Ijoic2hvcGlmeV90d2l0dGVyIiwibWFnZW50byI6Im1hZ2VudG9fdHdpdHRlciIsImJpZ2NvbW1lcmNlIjoiYmlnY29tbWVyY2VfdHdpdHRlciIsIndvb2NvbW1lcmNlIjoid29vY29tbWVyY2VfdHdpdHRlciIsInR3aXR0ZXIiOiJ0d2l0dGVyIn0=",
          appTag: "twitter_ads",
          Authorization: `Bearer ${TOKEN}`,
          "Ced-Source-Id": "889",
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": "890",
          "Ced-Target-Name": "twitter",
        },
      }
    );
    const data = await resp.json();
    const categories: { label: string; value: string }[] = data?.data?.map(
      (cat: any) => {
        return { label: cat.name, value: cat.category_id };
      }
    );

    setCategory(categories);
  }

  const handleSave = () => {
    console.log({
      templateName,
      categorySelection,
      overrideProducts,
      openProductGuide,
    });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <BodyLayout>
      <PageHeader
        title="Create New Template"
        description="Create a template as per your requirements by pre-defining inventory, and price, selecting categories & attributes, and assigning products accordingly.
        "
      />
      <Card
        primaryAction={{
          type: "Primary",
          content: "Save",
          onClick: handleSave,
        }}
      >
        <Tabs
          alignment="vertical"
          onChange={function noRefCheck() {}}
          selected={selected}
          value={[
            {
              content: "General",
              id: "general",
            },
            {
              content: "Category Selection",
              id: "category",
            },
            {
              content: "Attributes",
              id: "attributes",
            },
            {
              content: "Products",
              id: "products",
            },
          ]}
        >
          <Card>
            <FlexLayout
              desktopWidth="100"
              halign="fill"
              valign="stretch"
              spacing="loose"
            >
              <Card
                cardType="Bordered"
                title="Template Name"
                subTitle="Enter a unique name for the product template you wish to create"
              >
                <TextField
                  placeHolder="Enter Template Name"
                  showHelp="Minimum character limit 4 & maximum character limit 50"
                  value={templateName}
                  onChange={(e) => setTemplateName(e)}
                />
              </Card>
              <Card
                cardType="Bordered"
                title="Category Selection"
                subTitle="Select a category for the product template you wish to create"
              >
                <Select
                  options={category}
                  value={categorySelection}
                  onChange={(e) => {
                    console.log(e);
                    setCategorySelection(e);
                  }}
                />
              </Card>

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
                {requiredAttribOptions.map((opt: OptionsType) => {
                  return (
                    <Card cardType="Bordered">
                      <FlexLayout
                        desktopWidth="50"
                        halign="fill"
                        valign="center"
                      >
                        <TextStyles alignment="left">{opt.label}</TextStyles>
                        <Select options={opt.options} />
                      </FlexLayout>
                    </Card>
                  );
                })}
              </Card>

              <Card
                action={<Button type="Outlined">Add Attributes</Button>}
                cardType="Bordered"
                title="Optional Attributes"
                subTitle="This is an optional set of attributes that you may or may not map as per your requirements."
              >
                {optionalAttribOptions.map((opt: OptionsType) => {
                  return (
                    <Card cardType="Bordered">
                      <FlexLayout
                        desktopWidth="50"
                        halign="fill"
                        valign="center"
                      >
                        <TextStyles alignment="left">{opt.label}</TextStyles>
                        <Select options={opt.options} />
                      </FlexLayout>
                    </Card>
                  );
                })}
              </Card>

              <Card
                cardType="Bordered"
                title="Add Products"
                subTitle="Create Rules to filter, group and assign Shopify products to a newly created Template. to know more on how to select and add products to your template, check out the product selection guide below."
              >
                <FlexLayout>
                  <Card>
                    <Accordion
                      boxed
                      icon
                      iconAlign="right"
                      onClick={() => setOpenProductGuide((prev) => !prev)}
                      title="Product Selection Guide"
                      active={openProductGuide}
                    >
                      <TextStyles fontweight="bold">
                        How to filter products for the template?
                      </TextStyles>
                      <List type="disc">
                        <TextStyles>
                          Choose desired filter options and create a query to
                          filter the products,
                        </TextStyles>
                        <TextStyles>
                          Click “Run Query” to execute and check the query.
                        </TextStyles>
                      </List>

                      <TextStyles fontweight="bold">Add Group</TextStyles>
                      <TextStyles>
                        Add Group - Add Group refers to the ‘OR’ condition,
                        which implies that the desired results will be shown
                        when any ‘ONE’ group condition is ‘TRUE’.
                      </TextStyles>

                      <TextStyles fontweight="bold">Add Row</TextStyles>
                      <TextStyles>
                        Add Row - Add Row refers to the ‘AND’ condition which
                        implies that the desired results will be shown when
                        ‘ALL’ the conditions within one group is ‘TRUE’.
                      </TextStyles>
                    </Accordion>
                  </Card>
                  <Card>
                    <CheckBox
                      checked={overrideProducts}
                      description="Select this option if you wish to override products with template already assigned."
                      labelVal="Override Products"
                      onClick={() => setOverrideProducts((prev) => !prev)}
                    />
                  </Card>
                </FlexLayout>
              </Card>
              <Card title="This component will be made later">
                This component will be made later
              </Card>
            </FlexLayout>
          </Card>
        </Tabs>
      </Card>
      <PageFooter>
        <TextStyles>Cedcommerce @ 2022</TextStyles>
        <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
      </PageFooter>
    </BodyLayout>
  );
}

export default CreateTemplate;
