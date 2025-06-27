import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Space,
  Spin,
} from "antd";

const DeliveryStaffManagement = () => {
  const [deliveryStaffs, setDeliveryStaffs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchDeliveryStaffs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/DeliveryStaff");
      const data = await response.json();
      setDeliveryStaffs(data);
    } catch (error) {
      console.error("Failed to fetch delivery staff:", error.message);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchDeliveryStaffs();
  }, []);

  const handleAdd = async (values) => {
    try {
      const response = await fetch("/DeliveryStaff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed to add delivery staff");
      message.success("Added successfully");
      fetchDeliveryStaffs();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error.message);
      message.error("Failed to add delivery staff");
    }
  };

  const handleEdit = async (values) => {
    try {
      const response = await fetch(
        `/DeliveryStaff/${currentStaff.nhanVienGiaoHangId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...currentStaff, ...values }),
        }
      );
      if (!response.ok) throw new Error("Failed to update delivery staff");
      message.success("Updated successfully");
      fetchDeliveryStaffs();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error.message);
      message.error("Failed to update delivery staff");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/DeliveryStaff/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete delivery staff");
      message.success("Deleted successfully");
      fetchDeliveryStaffs();
    } catch (error) {
      console.error(error.message);
      message.error("Failed to delete delivery staff");
    }
  };

  const openModal = (staff = null) => {
    setIsEditing(!!staff);
    setCurrentStaff(staff);
    setIsModalOpen(true);
    if (staff) {
      form.setFieldsValue(staff);
    } else {
      form.resetFields();
    }
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (isEditing) {
          handleEdit(values);
        } else {
          handleAdd(values);
        }
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số Đơn Hàng Đã Giao",
      dataIndex: "soDonHangDaGiao",
      key: "soDonHangDaGiao",
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa nhân viên này không?"
            onConfirm={() => handleDelete(record.nhanVienGiaoHangId)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <div
        style={{
          padding: "10px 60px 10px 60px",
          display: "flex",
          gap: 4,
          flexDirection: "column",
        }}
      >
        <Button
          type="primary"
          onClick={() => openModal()}
          style={{ marginBottom: 16 }}
        >
          Thêm Nhân Viên
        </Button>
        <Table
          columns={columns}
          dataSource={deliveryStaffs}
          rowKey="nhanVienGiaoHangId"
          bordered
        />
        <Modal
          title={isEditing ? "Sửa Nhân Viên" : "Thêm Nhân Viên"}
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={isEditing ? "Cập Nhật" : "Thêm"}
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="hoTen"
              label="Họ Tên"
              rules={[
                { required: true, message: "Họ tên không được để trống!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="soDienThoai"
              label="Số Điện Thoại"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống!",
                },
                { pattern: /^\d+$/, message: "Số điện thoại không hợp lệ!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Email không được để trống!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="soDonHangDaGiao"
              label="Số Đơn Hàng Đã Giao"
              rules={[
                {
                  required: true,
                  message: "Số đơn hàng đã giao không được để trống!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Spin>
  );
};

export default DeliveryStaffManagement;
