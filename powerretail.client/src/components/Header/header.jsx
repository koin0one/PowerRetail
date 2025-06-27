import React from "react";
import { Layout, Typography, Space, Button } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

const CustomPageHeader = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authenticated="));
    if (authCookie) document.cookie = "";
    navigate("/login");
  };
  return (
    <>
      <Header
        style={{
          backgroundColor: "#fff", // Màu nền trắng
          padding: "0 24px",
          borderBottom: "1px solid #f0f0f0", // Viền nhẹ
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <HomeOutlined style={{ fontSize: "20px", color: "#000" }} />
          <Text
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Dashboard
          </Text>
          <Space>
            <Button onClick={() => navigate('/products')} color="default" variant="link">
              <b>Sản phẩm</b>
            </Button>
            <Button onClick={() => navigate('/khachhang')} color="default" variant="link">
              <b>Thông tin khách hàng</b>
            </Button>
            <Button onClick={() => navigate('/nhanvien')} color="default" variant="link">
              <b>Nhân viên giao hàng</b>
            </Button>
          </Space>
        </div>
        <Space>
          <Button onClick={handleLogout} type="primary">
            Đăng xuất
          </Button>
        </Space>
      </Header>
      {children}
    </>
  );
};

export default CustomPageHeader;
