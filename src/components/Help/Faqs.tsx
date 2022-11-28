import {
  Card,
  TextStyles,
  PageFooter,
  BodyLayout,
  Faq,
} from "@cedcommerce/ounce-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFaqsSearch from "../../hooks/useFaqsSearch";
import useGetAllFaqs from "../../hooks/useGetAllFaqs";

function Faqs() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [activePage, setActivePages] = useState<number[]>([1, 1, 1]);
  const generalFaqs = useGetAllFaqs("general_queries");
  const productFaqs = useGetAllFaqs("product_section");
  const templateFaqs = useGetAllFaqs("template_section");
  const { searchedFaqs } = useFaqsSearch(enteredValue);

  const faqSection = {
    "General Queries": generalFaqs ? generalFaqs : [],
    "Product Section": productFaqs ? productFaqs : [],
    "Template Section": templateFaqs ? templateFaqs : [],
  };
  console.log(searchedFaqs);

  return (
    <BodyLayout>
      <Card>
        {enteredValue === "" ? (
          <Faq
            options={faqSection}
            count={2}
            data={faqSection}
            Searchvalue={searchValue}
            description="Find Solution To All Your queries"
            iconAlign="right"
            onEnter={(e) => {
              setEnteredValue(e);
            }}
            onSearch={(e) => setSearchValue(e)}
            onClick={() => navigate("/panel/help", { replace: true })}
            reverseNavigation
            title="FAQ"
          />
        ) : (
          <Faq
            options={{ "Search Result": searchedFaqs ?? [] }}
            count={2}
            data={{ "Search Result": searchedFaqs ?? [] }}
            Searchvalue={searchValue}
            description="Find Solution To All Your queries"
            iconAlign="right"
            onEnter={(e) => {
              setEnteredValue(e);
            }}
            onSearch={(e) => setSearchValue(e)}
            onClick={() => navigate("/panel/help", { replace: true })}
            reverseNavigation
            title="FAQ"
          />
        )}
      </Card>
      <PageFooter>
        <TextStyles>Cedcommerce @ 2022</TextStyles>
        <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
      </PageFooter>
    </BodyLayout>
  );
}

export default Faqs;
