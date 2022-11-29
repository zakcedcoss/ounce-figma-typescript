import { useEffect, useState } from "react";
import { TOKEN } from "../Environments";

function useFaqsSearch(value: string) {
  const [searchedFaqs, setSearchedFaqs] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getSearchFaqs = (value: string) => {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${TOKEN}`);
    myHeaders.append("Cookie", "PHPSESSID=qfpnipu69set2cr7juc88bqaik");

    fetch(
      `https://multi-account.sellernext.com/home/public/twitter/faq/search?target_marketplace=eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9&activePage=1&pageSize=10&query=${value}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const newFaqs = data?.response?.map((faq: any) => {
            return { title: faq.question, content: faq.answer };
          });
          setSearchedFaqs(newFaqs);
          setIsLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (value) {
      getSearchFaqs(value);
    }
  }, [value]);

  return { searchedFaqs, isLoading };
}

export default useFaqsSearch;
