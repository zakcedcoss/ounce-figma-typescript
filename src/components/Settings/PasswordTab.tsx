import {
  Card,
  FlexLayout,
  TextField,
  FormElement,
} from "@cedcommerce/ounce-ui";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";

function PassowrdTab() {
  const passwordFields: string[] = [
    "Current Password",
    "New Password",
    "Re-Enter New Password",
  ];
  const [selected, setSelected] = useState<number[]>([-1, -1, -1]);

  return (
    <Card
      title="Password Reset"
      primaryAction={{
        content: "Change Password",
        type: "Primary",
      }}
    >
      <FormElement>
        <FlexLayout
          desktopWidth="100"
          mobileWidth="100"
          spacing="loose"
          tabWidth="100"
          direction="vertical"
        >
          {passwordFields.map((field: string, i: number) => {
            return (
              <TextField
                showHelp={
                  i === 1
                    ? "To create a strong password make sure the password contains - a minimum of 8 characters, uppercase and lowercase letter, number and special character"
                    : ""
                }
                innerSufIcon={
                  selected[i] === i ? (
                    <EyeOutlined
                      onClick={() => {
                        const newSelected: number[] = [...selected];
                        newSelected[i] = -1;
                        setSelected(newSelected);
                      }}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      onClick={() => {
                        const newSelected: number[] = [...selected];
                        newSelected[i] = i;
                        setSelected(newSelected);
                      }}
                    />
                  )
                }
                autocomplete="off"
                name={field}
                onChange={() => {}}
                placeHolder="Enter First Name"
                type={selected[i] === i ? "text" : "password"}
              />
            );
          })}
        </FlexLayout>
      </FormElement>
    </Card>
  );
}

export default PassowrdTab;
