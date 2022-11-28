import { useEffect, useState } from "react";
import { TOKEN } from "../Environments";

function useGetAllFaqs(section: string) {
  const [faqs, setFaqs] = useState<any>();

  const getAllFaqs = (section: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${TOKEN}`);
    myHeaders.append("Cookie", "PHPSESSID=qfpnipu69set2cr7juc88bqaik");

    fetch(
      `https://multi-account.sellernext.com/home/public/twitter/faq/getAllFaqForCustomer?target_marketplace=eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9&activePage=1&pageSize=2&section_code=${section}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          const newFaqs = data?.response[section].data.map((faq: any) => {
            return { title: faq.question, content: faq.answer };
          });
          setFaqs(newFaqs);
        }
      })
      .catch(console.log);
  };

  useEffect(() => {
    getAllFaqs(section);
  }, []);

  return faqs;
}

export default useGetAllFaqs;
