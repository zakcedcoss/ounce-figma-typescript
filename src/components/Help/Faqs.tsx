import {
  Card,
  TextStyles,
  PageFooter,
  BodyLayout,
  Faq,
  Skeleton,
  Accordion,
  Button,
  FlexLayout,
} from "@cedcommerce/ounce-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFaqsSearch from "../../hooks/useFaqsSearch";
import useGetAllFaqs from "../../hooks/useGetAllFaqs";

function Faqs() {
  // const navigate = useNavigate();
  // const [searchValue, setSearchValue] = useState<string>("");
  // const [enteredValue, setEnteredValue] = useState<string>("");
  // const { searchedFaqs } = useFaqsSearch(enteredValue);
  const [pageSize, setPageSize] = useState<number[]>([2, 2, 2]);
  const { faqs: generalFaqs, totalCount: genFaqCount } = useGetAllFaqs(
    "general_queries",
    pageSize[0]
  );
  const { faqs: productFaqs, totalCount: productFaqCount } = useGetAllFaqs(
    "product_section",
    pageSize[1]
  );
  const { faqs: templateFaqs, totalCount: templateFaqCount } = useGetAllFaqs(
    "template_section",
    pageSize[2]
  );
  const [active, setActive] = useState<{ [key: string]: boolean[] }>({
    "General Queries": [false, false, false],
    "Product Section": [false, false, false],
    "Template Section": [false, false, false],
  });

  const faqSection: any = {
    "General Queries": generalFaqs ? generalFaqs : [],
    "Product Section": productFaqs ? productFaqs : [],
    "Template Section": templateFaqs ? templateFaqs : [],
  };

  const totalCounts = [genFaqCount, productFaqCount, templateFaqCount];

  const handleClickMore = (idx: number) => {
    setPageSize((prev) => {
      return prev.map((pageIdx, i) => {
        if (i === idx) return pageIdx + 2;
        return pageIdx;
      });
    });
  };

  const handleClickLess = (idx: number) => {
    setPageSize((prev) => {
      return prev.map((pageIdx, i) => {
        if (i === idx) return 2;
        return pageIdx;
      });
    });
  };

  return (
    <BodyLayout>
      {Object.keys(faqSection).map((section: any, i: number) => {
        return (
          <>
            <Card key={i} title={section}>
              {faqSection[section].map((faq: any, j: number) => {
                return (
                  <Accordion
                    key={`${i}-${j}`}
                    boxed
                    icon
                    iconAlign="left"
                    onClick={() => {
                      setActive((prev) => {
                        return {
                          ...prev,
                          [section]: prev[section].map((sec, k) => {
                            if (k === j) return !sec;
                            return sec;
                          }),
                        };
                      });
                    }}
                    title={faq?.title}
                    active={active[section][j]}
                  >
                    <TextStyles textcolor="light">{faq?.content}</TextStyles>
                  </Accordion>
                );
              })}
              <FlexLayout halign="center">
                {totalCounts[i] > pageSize[i] ? (
                  <Button type="Outlined" onClick={() => handleClickMore(i)}>
                    Show More
                  </Button>
                ) : (
                  <Button type="Outlined" onClick={() => handleClickLess(i)}>
                    Show Less
                  </Button>
                )}
              </FlexLayout>
            </Card>
          </>
        );
      })}
      {/* {enteredValue === "" ? (
          <Faq
            options={
              faqSection || <Skeleton line={3} rounded="0%" type="line" />
            }
            count={2}
            data={faqSection || <Skeleton line={3} rounded="0%" type="line" />}
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
        )} */}

      <PageFooter>
        <TextStyles>Cedcommerce @ 2022</TextStyles>
        <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
      </PageFooter>
    </BodyLayout>
  );
}

export default Faqs;
