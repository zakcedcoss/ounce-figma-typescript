import {
  Accordion,
  BodyLayout,
  Card,
  CheckBox,
  FlexLayout,
  List,
  PageFooter,
  PageHeader,
  Tabs,
  TextField,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import { useCallback, useState } from "react";
import useProductAttributes from "../../hooks/useProductAttributes";
import { OptionalOptionType } from "../../types/types";
import CategorySelection from "./CategorySelection/CategorySelection";
import OptionalAttributes from "./OptionalAttributes/OptionalAttributes";
import QueryBuilder from "./QueryBuilder/QueryBuilder";
import RequiredAttributes from "./RequiredAttributes/RequiredAttributes";

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

  const optionalAttribOptions: OptionalOptionType[] = [
    {
      label: "color",
      options: [
        { label: "color", value: "color" },
        { label: "size", value: "size" },
        { label: "weight", value: "weight" },
      ],
    },
    {
      label: "Size",
      options: [
        { label: "color", value: "color" },
        { label: "size", value: "size" },
        { label: "weight", value: "weight" },
      ],
    },
  ];

  //states
  const [selected, setSelected] = useState<string>("general");
  const [overrideProducts, setOverrideProducts] = useState<boolean>(false);
  const [openProductGuide, setOpenProductGuide] = useState<boolean>(false);
  const [templateName, setTemplateName] = useState<string>("");
  const [reqAttribOutput, setReqAttribOutput] = useState<string[][]>(
    new Array(requiredAttribOptions.length).fill(["", ""])
  );
  const [categoryPath, setCategoryPath] = useState<string>("");
  const [optAttribOutput, setOptAttribOutput] = useState<string[][]>(
    new Array(optionalAttribOptions.length).fill(["", ""])
  );
  const [query, setQuery] = useState<string>("");
  //memos
  const setCategoryPathMemo = useCallback(setCategoryPath, [setCategoryPath]);
  const setReqAttribOutputMemo = useCallback(setReqAttribOutput, [
    setReqAttribOutput,
  ]);
  const setOptAttribOutputMemo = useCallback(setOptAttribOutput, [
    setOptAttribOutput,
  ]);
  const setQueryMemo = useCallback(setQuery, [setQuery]);

  const handleSave = () => {
    console.log(
      {
        templateName,
        optAttribOutput,
        overrideProducts,
        categoryPath,
        reqAttribOutput,
        query,
      },
      "fgregdgdfg"
    );
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
              <CategorySelection
                setCategoryPathMemo={setCategoryPathMemo}
                categoryPath={categoryPath}
              />
              <RequiredAttributes
                reqAttribOutput={reqAttribOutput}
                setReqAttribOutputMemo={setReqAttribOutputMemo}
              />
              <OptionalAttributes
                optAttribOutput={optAttribOutput}
                setOptAttribOutputMemo={setOptAttribOutputMemo}
              />
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
                <QueryBuilder setQueryMemo={setQueryMemo} query={query} />
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
