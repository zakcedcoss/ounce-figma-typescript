import { PlusCircleOutlined } from "@ant-design/icons";
import { Card, FlexLayout, TextStyles } from "@cedcommerce/ounce-ui";
import { useNavigate } from "react-router-dom";

function AccountTab() {
  const navigate = useNavigate();
  return (
    <Card
      title="Account Setting"
      primaryAction={{
        type: "Primary",
        icon: <PlusCircleOutlined />,
        content: "Add Account",
        onClick: () => {
          navigate("/panel/settings/new-account", { replace: true });
        },
      }}
    >
      <Card cardType="Bordered">
        <TextStyles>Shopify</TextStyles>
        <Card>
          <FlexLayout direction="vertical" halign="fill" spacing="loose">
            <FlexLayout direction="vertical">
              <TextStyles>Store URL</TextStyles>
              <TextStyles>twitter-demo7.myshopify.com</TextStyles>
            </FlexLayout>
            <FlexLayout direction="vertical">
              <TextStyles>Email</TextStyles>
              <TextStyles>zeeshanahmadkhan@cedcommerce.com</TextStyles>
            </FlexLayout>
            <FlexLayout direction="vertical">
              <TextStyles>Business Name</TextStyles>
              <TextStyles>Zeesha A. Khan</TextStyles>
            </FlexLayout>
          </FlexLayout>
        </Card>
      </Card>
    </Card>
  );
}

export default AccountTab;
