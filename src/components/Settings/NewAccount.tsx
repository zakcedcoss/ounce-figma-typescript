import {
  BodyLayout,
  Card,
  FlexLayout,
  PageHeader,
  Select,
} from "@cedcommerce/ounce-ui";
import { useNavigate } from "react-router-dom";

function NewAccount() {
  const navigate = useNavigate();
  return (
    <BodyLayout>
      <PageHeader
        title="Add Account"
        reverseNavigation={true}
        onClick={() => {
          navigate("/panel/settings/account");
        }}
      />
      <FlexLayout halign="center" desktopWidth="50">
        <Card
          cardType="Shadowed"
          title="Choose Framework"
          primaryAction={{
            content: "Connect",
            type: "Primary",
          }}
        >
          <Select />
        </Card>
      </FlexLayout>
    </BodyLayout>
  );
}

export default NewAccount;
