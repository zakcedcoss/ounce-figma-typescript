import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { lazy, Suspense } from "react";
import GeneralTab from "./components/Settings/GeneralTab";
import AccountTab from "./components/Settings/AccountTab";
import PassowrdTab from "./components/Settings/PasswordTab";
import ProductTab from "./components/Settings/ProductTab";
import Faqs from "./components/Help/Faqs";
import ErrorPage from "./pages/ErrorPage";
import NewAccount from "./components/Settings/NewAccount";
import CreateTemplate from "./components/Templates/CreateTemplate";

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./Layout/index"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const EditProduct = lazy(() => import("./components/Profiling/EditProduct"));
const Profiling = lazy(() => import("./components/Profiling/Profiling"));
const Templates = lazy(() => import("./components/Templates/Templates"));
const Settings = lazy(() => import("./components/Settings/Settings"));
const Help = lazy(() => import("./components/Help/Help"));
const Activities = lazy(() => import("./components/Activities/Activities"));
const Auth = lazy(() => import("./pages/Auth"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spin size="large" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/:auth" element={<Auth />} />
          <Route path="/panel" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profiling" element={<Profiling />} />
            <Route path="profiling/edit/:id" element={<EditProduct />} />
            <Route path="templates" element={<Templates />} />
            <Route
              path="templates/create-templates"
              element={<CreateTemplate />}
            />
            <Route path="settings" element={<Settings />}>
              <Route path="general" element={<GeneralTab />} />
              <Route path="account" element={<AccountTab />} />
              <Route path="product" element={<ProductTab />} />
              <Route path="password" element={<PassowrdTab />} />
            </Route>
            <Route path="settings/new-account" element={<NewAccount />} />
            <Route path="activites" element={<Activities />} />
            <Route path="help" element={<Help />} />
            <Route path="help/faqs" element={<Faqs />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
