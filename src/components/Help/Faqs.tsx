import {
  Card,
  TextStyles,
  PageFooter,
  BodyLayout,
  Faq,
} from "@cedcommerce/ounce-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Faqs() {
  const data = {
    "Common Queries": [
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "How to make your Shopify Products available to the?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Is it necessary to select any plan to use the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title:
          "Will my plan get downgraded if I will not reach the limit as per the plan I selected?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Can we connect the Amazon pay account with the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Can we connect the Amazon pay account with the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Can we connect the Amazon pay account with the app?",
      },
    ],
    "Order Section": [
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "How to make your Shopify Products to the Amazon Sales Channel?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Is it necessary to select any plan to use the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title:
          "Will my plan get downgraded if I will not reach the limit as per the plan I selected?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Can we connect the Amazon pay account with the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Can we connect the Amazon pay account with the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Can we connect the Amazon pay account with the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "How to make your Shopify Products available ?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Is it necessary to select any plan to use the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title:
          "Will my plan get downgraded if I will not reach the limit as per the plan I selected?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Can we connect the Amazon pay account with the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Is it necessary to select any plan to use the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title:
          "Will my plan get downgraded if I will not reach the limit as per the plan I selected?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Can we connect the Amazon pay account with the app?",
      },
    ],
    "Product Section": [
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "How to make your Shopify Products ?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Is it necessary to select any plan to use the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title:
          "Will my plan get downgraded if I will not reach the limit as per the plan I selected?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Can we connect the Amazon pay account with the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Is it necessary to select any plan to use the app?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title:
          "Will my plan get downgraded if I will not reach the limit as per the plan I selected?",
      },
      {
        content:
          "Shipping products to other countries, especially those overseas, can often be... show more",
        title: "Can we connect the Amazon pay account with the app?",
      },
    ],
  };
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <BodyLayout>
      <Card>
        <Faq
          Searchvalue={searchValue}
          data={data}
          description="Find Solution To All Your queries"
          iconAlign="right"
          onEnter={() => {
            console.log("entering", searchValue);
          }}
          onSearch={(e) => {
            console.log(e);
            setSearchValue(e);
          }}
          onClick={() => navigate("/panel/help", { replace: true })}
          options={data}
          reverseNavigation
          title="FAQ"
        />
      </Card>
      <PageFooter>
        <TextStyles>Cedcommerce @ 2022</TextStyles>
        <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
      </PageFooter>
    </BodyLayout>
  );
}

export default Faqs;
