import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./Layout/index"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Profiling = lazy(() => import("./components/Profiling/Profiling"));
const Auth = lazy(() => import("./components/Auth"));

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
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
