import { Route, Routes, Navigate } from "react-router-dom";

import LoginRegister from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dashboard";
import CustomPageHeader from "./components/Header/header";
import CustomerManagement from "./pages/Customer/customer";
import DeliveryStaffManagement from "./pages/NhanVien/nhanvien";
import Gallery from "./components/Gallery";

function App() {
  return (
    <Routes>
      <Route element={<LoginRegister />} path="/" />
      <Route element={<LoginRegister />} path="/login" />
      <Route
        element={
          <CustomPageHeader>
            <Dashboard />
          </CustomPageHeader>
        }
        path="/products"
      />
      <Route
        element={
          <CustomPageHeader>
            <Dashboard />
          </CustomPageHeader>
        }
        path="/dashboard"
      />
      <Route
        element={
          <CustomPageHeader>
            <Gallery />
          </CustomPageHeader>
        }
        path="/dôntuse"
      />
      <Route
        element={
          <CustomPageHeader>
            <CustomerManagement />
          </CustomPageHeader>
        }
        path="/khachhang"
      />
      <Route
        element={
          <CustomPageHeader>
            <DeliveryStaffManagement />
          </CustomPageHeader>
        }
        path="/nhanvien"
      />
    </Routes>
  );
}

export default App;
