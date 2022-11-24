import {
  Accordion,
  BodyLayout,
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
import { useState } from "react";
import useProductAttributes from "../../hooks/useProductAttributes";
import { OptionalOptionType } from "../../types/types";
import CategorySelection from "./CategorySelection/CategorySelection";
import OptionalAttributes from "./OptionalAttributes/OptionalAttributes";
import QueryBuilder from "./QueryBuilder/QueryBuilder";

function CreateTemplate() {
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

  //states
  const [selected, setSelected] = useState<string>("general");
  const [overrideProducts, setOverrideProducts] = useState<boolean>(false);
  const [openProductGuide, setOpenProductGuide] = useState<boolean>(false);
  const [templateName, setTemplateName] = useState<string>("");
  const [reqAttribOutput, setReqAttribOutput] = useState<string[][]>(
    new Array(requiredAttribOptions.length).fill(["", ""])
  );

  const handleSave = () => {
    console.log({
      templateName,
      overrideProducts,
      openProductGuide,
    });
  };

  // console.log(reqAttribOutput, "ddsdsdsdsdsds");
  const handleOptionChange = (e: string, _: any, idx: any) => {
    setReqAttribOutput((prev) => {
      return prev.map((opt, i) => {
        if (i === idx && e === "custom") return [e, ""];
        else if (i === idx) return [e, e];
        return opt;
      });
    });
  };

  const handleTextEnter = (e: string, idx: number) => {
    setReqAttribOutput((prev) => {
      return prev.map((opt, i) => {
        if (i === idx) return [opt[0], e];
        return opt;
      });
    });
  };

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
          onChange={(e) => {
            setSelected(e);
          }}
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
              childWidth="fullWidth"
              desktopWidth="100"
              halign="fill"
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
              <CategorySelection />
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
                {requiredAttribOptions.map(
                  (opt: OptionalOptionType, i: number) => {
                    return (
                      <Card cardType="Bordered" key={i}>
                        <FlexLayout
                          desktopWidth="50"
                          halign="fill"
                          valign="center"
                        >
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
                  }
                )}
              </Card>
              <OptionalAttributes />
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
                <QueryBuilder />
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
