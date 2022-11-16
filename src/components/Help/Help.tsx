import {
  Card,
  Button,
  FlexLayout,
  TextStyles,
  PageFooter,
  BodyLayout,
  PageHeader,
  Accordion,
} from "@cedcommerce/ounce-ui";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HelpCardType {
  title: string;
  desc: string;
  icon: string;
}
function Help() {
  const helpCards: HelpCardType[] = [
    { title: "WhatsApp", desc: "Add us on WhatsApp!", icon: "WhatsApp icon" },
    { title: "Skype", desc: "Connect with us on Skype", icon: "Skype icon" },
    {
      title: "Email",
      desc: "Send your queries, feedback, or suggestions via email.",
      icon: "Email icon",
    },
  ];

  const faqQuestions: {
    ques: string;
    ans: string;
  }[] = [
    {
      ques: "How to sync new products from Shopify to the app?",
      ans: "Your Answer Here",
    },
    {
      ques: "How to upload products from the app to Twitter in bulk?",
      ans: "Your Answer Here",
    },
    {
      ques: "How to upload selected products from the app to Twitter?",
      ans: "Your Answer Here",
    },
    {
      ques: "How to auto-create new products from Shopify to the app?",
      ans: "Your Answer Here",
    },
    { ques: "What is a template?", ans: "Your Answer Here" },
  ];

  const [toggleFaqs, setToggleFaqs] = useState<boolean[]>(
    new Array(faqQuestions.length).fill(false)
  );

  return (
    <BodyLayout>
      <PageHeader title="Help" />
      <Card title="Please choose your preferred mode of communication">
        <FlexLayout halign="start" spacing="loose">
          {helpCards.map((card: HelpCardType, i: number) => {
            return (
              <Card cardType="Bordered" key={i}>
                <FlexLayout halign="fill">
                  <FlexLayout direction="vertical" spacing="extraLoose">
                    <FlexLayout direction="vertical">
                      <TextStyles type="SubHeading" fontweight="bold">
                        {card.title}
                      </TextStyles>
                      <TextStyles type="paragraph" paragraphTypes="XS-1.2">
                        {card.desc}
                      </TextStyles>
                    </FlexLayout>
                    <Button type="Outlined">Start Chat</Button>
                  </FlexLayout>
                  <FlexLayout desktopWidth="25">
                    <TextStyles>{card.icon}</TextStyles>
                  </FlexLayout>
                </FlexLayout>
              </Card>
            );
          })}
        </FlexLayout>
      </Card>
      <Card
        title="Frequently Asked Questions"
        action={<Link to="/panel/help/faqs">View all FAQ articles</Link>}
      >
        {faqQuestions.map((faq, i) => {
          return (
            <Accordion
              active={toggleFaqs[i]}
              key={i}
              boxed
              icon
              iconAlign="left"
              title={faq.ques}
              onClick={() => {
                const newFaqsToggle: boolean[] = [...toggleFaqs];
                newFaqsToggle[i] = !newFaqsToggle[i];
                setToggleFaqs(newFaqsToggle);
              }}
            >
              <TextStyles textcolor="light">{faq.ans}</TextStyles>
            </Accordion>
          );
        })}
      </Card>
      <PageFooter>
        <TextStyles>Cedcommerce @ 2022</TextStyles>
        <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
      </PageFooter>
    </BodyLayout>
  );
}

export default Help;
