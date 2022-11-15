import {
  Card,
  FlexLayout,
  FormElement,
  TextField,
  TextStyles,
  Toast,
  ToastWrapper,
} from "@cedcommerce/ounce-ui";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface InputType {
  fname?: string;
  lname?: string;
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
}

function Auth() {
  const navigate = useNavigate();
  const { auth } = useParams();
  const [inputs, setInputs] = useState<InputType>({});
  const [errors, setErrors] = useState<{ active: boolean; message: string }>({
    active: false,
    message: "",
  });

  const handleChange = (value: string, name: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = () => {
    if (
      Object.keys(inputs).length === 0 ||
      inputs?.fname === "" ||
      inputs?.email === "" ||
      inputs?.password === "" ||
      inputs?.lname === "" ||
      inputs?.username === "" ||
      inputs?.password2 === ""
    ) {
      setErrors({ active: true, message: "Fields should not me empty" });
      return;
    }
    console.log(inputs);
    navigate("/panel/dashboard", { replace: true });
  };

  return (
    <Card>
      <FlexLayout valign="center" direction="vertical">
        <TextStyles type="Heading" alignment="center">
          Welcome
        </TextStyles>
        <div
          style={{
            width: 450,
            marginInline: "auto",
          }}
        >
          <Card
            cardType="Shadowed"
            title={auth === "login" ? "Login" : "Register new user"}
            primaryAction={{
              type: "Primary",
              content: auth === "login" ? "Login" : "Register",
              onClick: handleSubmit,
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
                {auth !== "login" && (
                  <TextField
                    autocomplete="off"
                    name="First Name"
                    onChange={(e) => handleChange(e, "fname")}
                    placeHolder="Enter First Name"
                    type="text"
                  />
                )}
                {auth !== "login" && (
                  <TextField
                    autocomplete="off"
                    name="Last Name"
                    onChange={(e) => handleChange(e, "lname")}
                    placeHolder="Enter Last Name"
                    type="text"
                  />
                )}
                {auth !== "login" && (
                  <TextField
                    autocomplete="off"
                    name="Username"
                    onChange={(e) => handleChange(e, "username")}
                    placeHolder="Enter Username"
                    type="text"
                  />
                )}
                <TextField
                  autocomplete="off"
                  name="Email"
                  onChange={(e) => handleChange(e, "email")}
                  placeHolder="Enter Email"
                  type="email"
                />
                <TextField
                  autocomplete="off"
                  name="Password"
                  onChange={(e) => handleChange(e, "password")}
                  placeHolder="Enter Password"
                  type="password"
                />
                {auth !== "login" && (
                  <TextField
                    autocomplete="off"
                    name="Re-Enter Password"
                    onChange={(e) => handleChange(e, "password2")}
                    placeHolder="Enter Password Again"
                    type="password"
                  />
                )}
              </FlexLayout>
            </FormElement>
          </Card>
          <Card>
            {auth === "login" ? (
              <TextStyles>
                Not a member ? <Link to="/auth/signup">Sign Up</Link> instead
              </TextStyles>
            ) : (
              <TextStyles>
                Already a memeber ? <Link to="/auth/login">Login</Link>
              </TextStyles>
            )}
          </Card>
        </div>
      </FlexLayout>
      {errors?.active && (
        <ToastWrapper>
          <Toast
            message={errors.message}
            type="error"
            onDismiss={() => setErrors({ active: false, message: "" })}
            timeout={3000}
          />
        </ToastWrapper>
      )}
    </Card>
  );
}

export default Auth;
