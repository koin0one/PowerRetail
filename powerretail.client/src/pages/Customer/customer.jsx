import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, message, Space, Spin } from "antd";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/Customer");
      
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      let response;
      if (editingCustomer) {
        response = await fetch(`/Customer`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      } else {
        response = await fetch("/Customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      }

      if (!response.ok) throw new Error("Failed to save customer");

      message.success(
        editingCustomer ? "Cập nhật thành công!" : "Thêm thành công!"
      );
      fetchCustomers();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Đã xảy ra lỗi!");
    } finally {
      setIsLoading(false);
      form.resetFields();
    }
  };

  const deleteCustomer = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/Customer/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete customer");

      message.success("Xoá thành công!");
      setCustomers(customers.filter((customer) => customer.khachHangId !== id));
      form.resetFields();
    } catch (error) {
      message.error("Đã xảy ra lỗi khi xoá khách hàng!");
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = (customer = null) => {
    const cus = {
      diaChiNhanHang: customer?.diaChiNhanHang ?? "",
      khachHangId: customer?.khachHangId ?? "",
      soDienThoai: customer?.soDienThoai ?? "",
      tenKhachHang: customer?.tenKhachHang ?? ""
    }
    setEditingCustomer(customer);
    editingCustomer && form.setFieldsValue(cus);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const columns = [
    { title: "Tên khách hàng", dataIndex: "tenKhachHang", key: "tenKhachHang" },
    { title: "Số điện thoại", dataIndex: "soDienThoai", key: "soDienThoai" },
    { title: "Địa chỉ", dataIndex: "diaChiNhanHang", key: "diaChiNhanHang" },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Button
            type="link"
            danger
            onClick={() => deleteCustomer(record.khachHangId)}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <div style={{ padding: "20px" }}>
        <Button
          type="primary"
          onClick={() => showModal()}
          style={{ marginBottom: "20px" }}
        >
          Thêm khách hàng
        </Button>
        <Table
          columns={columns}
          dataSource={customers}
          rowKey={(record) => record.khachHangId}
          bordered
        />
      </div>

      <Modal
        title={editingCustomer ? "Cập nhật khách hàng" : "Thêm khách hàng"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Mã khách hàng"
            name="khachHangId"
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            label="Tên khách hàng"
            name="tenKhachHang"
            rules={[
              { required: true, message: "Vui lòng nhập tên khách hàng!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="soDienThoai"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ nhận hàng"
            name="diaChiNhanHang"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ nhận hàng!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
};

export default CustomerManagement;
