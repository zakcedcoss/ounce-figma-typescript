import { Topbar, Button, FlexLayout, NewSidebar } from "@cedcommerce/ounce-ui";
import { AiOutlineDown, AiOutlineSetting } from "react-icons/ai";
import { FiBell, FiBox } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { BsHouseDoor } from "react-icons/bs";
import { CgTemplate } from "react-icons/cg";
import { FaRegHandshake } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/auth/login", { replace: true });
  };

  return (
    <div>
      <Topbar
        connectRight={
          <FlexLayout spacing="tight">
            <Button
              iconAlign="right"
              icon={<AiOutlineDown />}
              type="Outlined"
              content="Shopify"
            />

            <Button iconAlign="left" icon={<FiBell />} type="Outlined" />
            <Button
              iconAlign="left"
              icon={<BiUser />}
              type="Outlined"
              onClick={handleUserClick}
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
