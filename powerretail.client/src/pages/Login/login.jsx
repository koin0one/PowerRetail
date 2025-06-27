import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message, Spin, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

class User {
  constructor(userName, passWord, fullName, question) {
    this.userName = userName;
    this.passWord = passWord;
    this.fullName = fullName;
    this.SecondPassword = question;
  }
}

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [form] = Form.useForm()

  const handleFinish = async (values) => {
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { userName: values.email, password: values.password }
        : new User(
            values.email,
            values.password,
            values.fullName,
            values["password-level2"]
          );

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let responseData;
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Lỗi không xác định xảy ra.");
      }

      if (res.ok) {
        if (isLogin) {
          document.cookie = `authenticated=${responseData.userId}; path=/`;
          message.success("Đăng nhập thành công! 😊");
          setLoading(true);
          setTimeout(() => {
            navigate("/products");
          }, 500);
        } else {
          message.success("Đăng ký thành công! 😊");
          setLoading(true);
          setIsRegistered(true);
          setTimeout(() => {
            setIsLogin(true);
            setLoading(false);
          }, 2000);
        }
      } else {
        throw new Error(responseData.message || "Có lỗi xảy ra!");
      }
    } catch (error) {
      message.error(error.message || "Có lỗi xảy ra!");
    } finally {
        setLoading(false);
    }
  };

  const handleOk = async (values) => {
    try {
      console.log({ values });
  
      const res = await fetch("/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (res.ok) {
        const data = await res.json();
        message.success(data.message || "Password changed successfully!");
      } else {
        const errorData = await res.json().catch(() => ({}));
        message.error(
          errorData.message || "An error occurred. Please try again later!"
        );
      }
    } catch (error) {
      console.error("Error in handleOk:", error);
      message.error("A network error occurred. Please check your connection!");
    } finally {
      setChangePassword(false);
      form.resetFields();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 8,
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Spin spinning={loading}>
          <Title level={3} style={{ textAlign: "center" }}>
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </Title>
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              email: "",
              password: "",
              fullName: "",
            }}
          >
            {!isLogin && (
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên của bạn!",
                  },
                ]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            )}
            <Form.Item
              label="Tên đăng nhập hoặc email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Vui lòng nhập email hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
            {!isLogin && (
              <Form.Item
                label="Câu hỏi bảo mật"
                name="password-level2"
                rules={[
                  { required: true, message: "Vui lòng nhập câu hỏi bảo mật!" },
                  {
                    min: 6,
                    message: "câu hỏi bảo mật phải có ít nhất 6 ký tự!",
                  },
                ]}
              >
                <Input placeholder="Nhập câu hỏi bảo mật" />
              </Form.Item>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {isLogin ? "Đăng nhập" : "Đăng ký"}
              </Button>
            </Form.Item>
          </Form>
          <Text style={{ display: "block", textAlign: "center" }}>
            {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}{" "}
            <Button
              type="link"
              onClick={() => setIsLogin(!isLogin)}
              style={{ padding: 0 }}
              disabled={isRegistered}
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </Button>
          </Text>
          <Text style={{ display: "block", textAlign: "center" }}>
            <Button
              type="link"
              onClick={() => setChangePassword(!changePassword)}
              style={{ padding: 0 }}
              disabled={isRegistered}
            >
              Đổi mật khẩu?
            </Button>
          </Text>
        </Spin>
      </div>
      <Modal
        height={600}
        footer={null}
        title="Đổi mật khẩu"
        open={changePassword}
        onCancel={() => setChangePassword(false)}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleOk}
          initialValues={{
            username: "",
            oldPassword: "",
            newPassword: "",
          }}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập!",
              },
            ]}
          >
            <Input placeholder="Nhập tên đăng nhập hoặc email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu cũ!",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu cũ" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
              {
                min: 6,
                message: "Mật khẩu mới phải có ít nhất 6 ký tự!",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Xác nhận đổi mật khẩu
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              color="danger"
              variant="solid"
              block
              onClick={() => setChangePassword(false)}
            >
              Thoát
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginRegister;
