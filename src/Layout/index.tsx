import {
  Topbar,
  Button,
  FlexLayout,
  NewSidebar,
  TextStyles,
  ActionList,
} from "@cedcommerce/ounce-ui";
import {
  AiFillPlusCircle,
  AiOutlineDown,
  AiOutlineSetting,
} from "react-icons/ai";
import { FiBell, FiBox } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { BsHouseDoor } from "react-icons/bs";
import { CgTemplate } from "react-icons/cg";
import { FaRegHandshake } from "react-icons/fa";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Layout() {
  const navigate = useNavigate();
  // action list
  const [actionListOpen, setActionListOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string>("Shopify");
  const [actionListItem, setActionListItem] = useState<string[]>([
    "Shopify",
    "Twitter",
    "Amazon",
  ]);
  // user action list
  const [userActionListOpen, setUserActionListOpen] = useState<boolean>(false);

  const handleUserClick = () => {
    navigate("/auth/login", { replace: true });
  };

  return (
    <div>
      <Topbar
        connectRight={
          <FlexLayout spacing="tight">
            <ActionList
              open={actionListOpen}
              direction="left"
              activator={
                <Button
                  icon={<AiOutlineDown />}
                  iconAlign="right"
                  onClick={() => setActionListOpen(!actionListOpen)}
                  type="Outlined"
                >
                  {selectedAction}
                </Button>
              }
              sections={[
                {
                  items: actionListItem.map((item) => {
                    return {
                      content: item,
                      onClick: () => {
                        setSelectedAction(item);
                        setActionListOpen(false);
                      },
                    };
                  }),
                },
              ]}
              primaryAction={{
                type: "Plain",
                content: "Add Items",
                icon: <AiFillPlusCircle />,
              }}
            />
            <Link to="/panel/activites">
              <Button iconAlign="left" icon={<FiBell />} type="Outlined" />
            </Link>
            <ActionList
              open={userActionListOpen}
              direction="left"
              activator={
                <Button
                  iconAlign="left"
                  icon={<BiUser />}
                  type="Outlined"
                  onClick={() => setUserActionListOpen(!userActionListOpen)}
                />
              }
              sections={[
                {
                  items: [
                    {
                      content: (
                        <FlexLayout direction="vertical">
                          <TextStyles type="" content="First Name" />
                          <TextStyles
                            textcolor="light"
                            type="paragraph"
                            content="Fayyaz"
                          />
                        </FlexLayout>
                      ),
                    },
                    {
                      content: (
                        <FlexLayout direction="vertical">
                          <TextStyles type="" content="Last Name" />
                          <TextStyles
                            textcolor="light"
                            type="paragraph"
                            content="Takkar"
                          />
                        </FlexLayout>
                      ),
                    },
                    {
                      content: (
                        <FlexLayout direction="vertical">
                          <TextStyles type="" content="Email" />
                          <TextStyles
                            textcolor="light"
                            type="paragraph"
                            content="fayyaz@takkar.com"
                          />
                        </FlexLayout>
                      ),
                    },
                  ],
                },
              ]}
              primaryAction={{
                type: "Outlined",
                content: "Sign Out",
                onClick: () => handleUserClick(),
              }}
            />
          </FlexLayout>
        }
      />
      <NewSidebar
        // logo={
        //   <img
        //     alt="CedCommerce"
        //     src="https://d3vlhkqyz4y38a.cloudfront.net/skin/frontend/cedcomnew/default/images/header/logo/ced-logo-web.svg"
        //     title="CedCommerce"
        //     width={150}
        //   />
        // }
        onChange={(e: {
          content: string;
          icon: symbol;
          id: string;
          path: string;
        }) => {
          navigate(e.path);
        }}
        menu={[
          {
            content: "Dashboard",
            icon: <BsHouseDoor />,
            id: "dashboard",
            path: "/panel/dashboard",
          },
          {
            content: "Product Listing",
            icon: <FiBox />,
            id: "profiling",
            path: "/panel/profiling",
          },
          {
            content: "Templates",
            icon: <CgTemplate />,
            id: "products",
            path: "/panel/templates",
          },
          {
            content: "Settings",
            icon: <AiOutlineSetting />,
            id: "products",
            path: "/panel/settings",
          },
          {
            content: "Help",
            icon: <FaRegHandshake />,
            id: "products",
            path: "/panel/help",
          },
        ]}
      />
      <Outlet />
    </div>
  );
}

export default Layout;
