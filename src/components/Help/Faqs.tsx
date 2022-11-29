import {
  Card,
  TextStyles,
  PageFooter,
  BodyLayout,
  Skeleton,
  Accordion,
  Button,
  FlexLayout,
} from "@cedcommerce/ounce-ui";
import { PageHeader, AutoComplete } from "antd";
import { useEffect, useMemo, useState } from "react";
import useFaqsSearch from "../../hooks/useFaqsSearch";
import useGetAllFaqs from "../../hooks/useGetAllFaqs";

function Faqs() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [enteredValue, setEnteredValue] = useState<string>("");
  const { searchedFaqs } = useFaqsSearch(enteredValue);
  const [pageSize, setPageSize] = useState<number[]>([2, 2, 2]);
  const {
    faqs: generalFaqs,
    totalCount: genFaqCount,
    isLoading: genLoading,
  } = useGetAllFaqs("general_queries", pageSize[0]);
  const {
    faqs: productFaqs,
    totalCount: productFaqCount,
    isLoading: productLoading,
  } = useGetAllFaqs("product_section", pageSize[1]);
  const {
    faqs: templateFaqs,
    totalCount: templateFaqCount,
    isLoading: templateLoading,
  } = useGetAllFaqs("template_section", pageSize[2]);
  const [active, setActive] = useState<{ [key: string]: boolean[] }>({});
  const [searchActive, setSearchActive] = useState<boolean[]>([]);

  const faqSection: any = useMemo(() => {
    return {
      "General Queries": generalFaqs ? generalFaqs : [],
      "Product Section": productFaqs ? productFaqs : [],
      "Template Section": templateFaqs ? templateFaqs : [],
    };
  }, [generalFaqs, productFaqs, templateFaqs]);

  const totalCounts = useMemo(() => {
    return [genFaqCount, productFaqCount, templateFaqCount];
  }, [genFaqCount, productFaqCount, templateFaqCount]);

  const loadings = useMemo(() => {
    return [genLoading, productLoading, templateLoading];
  }, [genLoading, productLoading, templateLoading]);

  const options = useMemo(() => {
    return searchedFaqs?.map((faqs: any) => {
      return { value: faqs.title };
    });
  }, [searchedFaqs]);

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

  const handleSumbit = (e: any) => {
    e.preventDefault();
    setEnteredValue(searchValue);
  };

  useEffect(() => {
    setActive({
      "General Queries": new Array(generalFaqs?.length).fill(false),
      "Product Section": new Array(productFaqs?.length).fill(false),
      "Template Section": new Array(templateFaqs?.length).fill(false),
    });
  }, [generalFaqs, productFaqs, templateFaqs]);

  useEffect(() => {
    setSearchActive(new Array(searchedFaqs?.length).fill(false));
  }, [searchedFaqs]);

  return (
    <BodyLayout>
      <PageHeader title="FAQs"></PageHeader>
      <Card>
        <form onSubmit={handleSumbit}>
          <AutoComplete
            style={{ width: "100%" }}
            value={searchValue}
            placeholder="Search Faqs"
            onChange={(e) => setSearchValue(e)}
            options={options}
            filterOption={true}
            onSelect={(e: string) => setSearchValue(e)}
          />
        </form>
      </Card>
      {enteredValue === "" ? (
        <Card>
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
                        <TextStyles textcolor="light">
                          {faq?.content}
                        </TextStyles>
                      </Accordion>
                    );
                  })}
                  <FlexLayout halign="center">
                    {totalCounts[i] > pageSize[i] ? (
                      <Button
                        loading={loadings[i]}
                        type="Outlined"
                        onClick={() => handleClickMore(i)}
                      >
                        Show More
                      </Button>
                    ) : (
                      <Button
                        type="Outlined"
                        onClick={() => handleClickLess(i)}
                      >
                        Show Less
                      </Button>
                    )}
                  </FlexLayout>
                </Card>
              </>
            );
          })}
        </Card>
      ) : (
        <Card title="Search Result">
          {searchedFaqs?.length === 0 ? (
            <TextStyles>No Data Found</TextStyles>
          ) : (
            searchedFaqs?.map((faq: any, j: number) => {
              return (
                <Accordion
                  key={j}
                  boxed
                  icon
                  iconAlign="left"
                  onClick={() => {
                    setSearchActive((prev) => {
                      return prev.map((state: boolean, i: number) => {
                        if (j === i) return !state;
                        return state;
                      });
                    });
                  }}
                  title={faq?.title}
                  active={searchActive[j]}
                >
                  <TextStyles textcolor="light">{faq?.content}</TextStyles>
                </Accordion>
              );
            })
          )}
        </Card>
      )}

      <PageFooter>
        <TextStyles>Cedcommerce @ 2022</TextStyles>
        <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
      </PageFooter>
    </BodyLayout>
  );
}

export default Faqs;
