import {
  Card,
  FlexLayout,
  FormElement,
  TextField,
  TextStyles,
  Toast,
  ToastWrapper,
} from "@cedcommerce/ounce-ui";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  usernameValidator,
} from "../validator/inputValidator";

interface InputType {
  fname?: string;
  lname?: string;
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
}

function Auth() {
  const initialInputs = {
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  };
  const navigate = useNavigate();
  const { auth } = useParams();
  const [inputs, setInputs] = useState<InputType>(initialInputs);
  const [errorMessages, setErrorMessages] = useState<{
    [key: string]: [boolean, string];
  }>({});
  const [errors, setErrors] = useState<{ active: boolean; message: string }>({
    active: false,
    message: "",
  });

  useEffect(() => {
    setInputs(initialInputs);
    setErrorMessages({});
    setErrors({
      active: false,
      message: "",
    });
  }, [auth]);

  const handleChange = (value: string, name: string) => {
    if (name === "fname") {
      const errMsg = nameValidator(value);
      setErrorMessages({
        ...errorMessages,
        fname: [
          errMsg.active,
          errMsg.message ? "First " + errMsg.message : errMsg.message,
        ],
      });
    }
    if (name === "lname") {
      const errMsg = nameValidator(value);
      setErrorMessages({
        ...errorMessages,
        lname: [
          errMsg.active,
          errMsg.message ? "Last " + errMsg.message : errMsg.message,
        ],
      });
    }
    if (name === "username") {
      const errMsg = usernameValidator(value);
      setErrorMessages({
        ...errorMessages,
        username: [errMsg.active, errMsg.message],
      });
    }
    if (name === "email") {
      const errMsg = emailValidator(value);
      setErrorMessages({
        ...errorMessages,
        email: [errMsg.active, errMsg.message],
      });
    }
    if (name === "password") {
      const errMsg = passwordValidator(value);
      setErrorMessages({
        ...errorMessages,
        password: [errMsg.active, errMsg.message],
      });
    }
    if (name === "password2") {
      const errMsg = passwordValidator(value);
      setErrorMessages({
        ...errorMessages,
        password2: [errMsg.active, errMsg.message],
      });
    }
    setInputs({ ...inputs, [name]: value.toLocaleLowerCase() });
  };

  const handleSubmit = () => {
    if (auth === "signup") {
      if (
        !inputs?.email ||
        !inputs?.password ||
        !inputs?.fname ||
        inputs?.lname ||
        !inputs.username ||
        !inputs.password2
      ) {
        setErrors({ active: true, message: "Fill all the fields" });
        setInputs(initialInputs);
        return;
      }
    } else if (auth === "login") {
      if (!inputs?.email || !inputs?.password) {
        setErrors({ active: true, message: "Fill all the fields" });
        setInputs(initialInputs);
        return;
      }
    }

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
            title={auth === "login" ? "Login" : "Register New User"}
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
                    error={
                      errorMessages?.fname ? errorMessages?.fname[0] : false
                    }
                    showHelp={
                      errorMessages?.fname ? errorMessages?.fname[1] : ""
                    }
                    autocomplete="off"
                    name="First Name"
                    onChange={(e) => handleChange(e, "fname")}
                    placeHolder="Enter First Name"
                    type="text"
                    value={inputs.fname}
                  />
                )}
                {auth !== "login" && (
                  <TextField
                    error={
                      errorMessages?.lname ? errorMessages?.lname[0] : false
                    }
                    showHelp={
                      errorMessages?.lname ? errorMessages?.lname[1] : ""
                    }
                    autocomplete="off"
                    name="Last Name"
                    onChange={(e) => handleChange(e, "lname")}
                    placeHolder="Enter Last Name"
                    type="text"
                    value={inputs.lname}
                  />
                )}
                {auth !== "login" && (
                  <TextField
                    error={
                      errorMessages?.username
                        ? errorMessages?.username[0]
                        : false
                    }
                    showHelp={
                      errorMessages?.username ? errorMessages?.username[1] : ""
                    }
                    autocomplete="off"
                    name="Username"
                    onChange={(e) => handleChange(e, "username")}
                    placeHolder="Enter Username"
                    type="text"
                    value={inputs.username}
                  />
                )}
                <TextField
                  error={errorMessages?.email ? errorMessages?.email[0] : false}
                  showHelp={errorMessages?.email ? errorMessages?.email[1] : ""}
                  autocomplete="off"
                  name="Email"
                  onChange={(e) => handleChange(e, "email")}
                  placeHolder="Enter Email"
                  type="email"
                  value={inputs.email}
                />
                <TextField
                  error={
                    errorMessages?.password ? errorMessages?.password[0] : false
                  }
                  showHelp={
                    errorMessages?.password ? errorMessages?.password[1] : ""
                  }
                  autocomplete="off"
                  name="Password"
                  onChange={(e) => handleChange(e, "password")}
                  placeHolder="Enter Password"
                  type="password"
                  value={inputs.password}
                />
                {auth !== "login" && (
                  <TextField
                    error={
                      errorMessages?.password2
                        ? errorMessages?.password2[0]
                        : false
                    }
                    showHelp={
                      errorMessages?.password2
                        ? errorMessages?.password2[1]
                        : ""
                    }
                    autocomplete="off"
                    name="Re-Enter Password"
                    onChange={(e) => handleChange(e, "password2")}
                    placeHolder="Enter Password Again"
                    type="password"
                    value={inputs.password2}
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
