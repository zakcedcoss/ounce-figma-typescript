import {
  Card,
  TextStyles,
  PageFooter,
  BodyLayout,
  PageHeader,
  Tabs,
} from "@cedcommerce/ounce-ui";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function Settings() {
  const tabs: string[] = ["General", "Account", "Product", "Password"];
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>("general");

  useEffect(() => {
    navigate("/panel/settings/general");
  }, []);

  return (
    <BodyLayout>
      <PageHeader
        title="Settings"
        description="The section allows you to configure or view the pre-defined conditions that will decide how the app will function when uploading and generating Twitter feeds.
        "
      />
      <Card>
        <Tabs
          alignment="vertical"
          onChange={(e) => {
            setSelectedTab(e);
            navigate(`/panel/settings/${e}`);
          }}
          selected={selectedTab}
          value={tabs.map((tab) => {
            return { content: tab, id: tab.toLowerCase() };
          })}
        >
          <Outlet />
        </Tabs>
      </Card>
      <PageFooter>
        <TextStyles>Cedcommerce @ 2022</TextStyles>
        <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
      </PageFooter>
    </BodyLayout>
  );
}

export default Settings;
