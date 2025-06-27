import { Button, Spin } from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import React from "react";
import { Table, Popconfirm, message, Space, Modal, Form, Input } from "antd";
import Information from "../../components/Statistic";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/Product");
      const data = await response.json();

      if (data.products.length) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchProducts();
    document.title = "Sản phẩm";
  }, []);

  const cancel = (e) => {
    message.error("Không xoá");
  };

  const confirm = async (product) => {
    try {
      setIsLoading(true);

      const response = await fetch("/Product/delete-product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.products) {
        const deletedProductId = data.products.sanPhamId;

        setProducts((prev) =>
          prev.filter((x) => x.sanPhamId !== deletedProductId)
        );
        message.success("Xóa thành công!");
      } else {
        message.error("Không thể xóa sản phẩm. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      message.error("Đã xảy ra lỗi khi xóa sản phẩm!");
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mô tả",
      dataIndex: "moTaSanPham",
      key: "moTaSanPham",
    },
    {
      title: "Loại",
      key: "loaiSanPham",
      dataIndex: "loaiSanPham",
      filters: [...new Set(products.map((item) => item.danhMucSanPham))].map(
        (value) => ({
          text: value,
          value,
        })
      ),
      onFilter: (value, record) => record.danhMucSanPham === value,
    },
    {
      title: "Danh Mục",
      key: "danhMucSanPham",
      dataIndex: "danhMucSanPham",
      filters: [...new Set(products.map((item) => item.danhMucSanPham))].map(
        (value) => ({
          text: value,
          value,
        })
      ),
      onFilter: (value, record) => record.danhMucSanPham === value,
    },
    {
      title: "Giá bán",
      key: "giaSanPham",
      dataIndex: "giaSanPham",
      render: (text) => {
        const price = Number(text);
        let color = "green";

        if (price >= 500000 && price <= 1000000) {
          color = "orange";
        } else if (price > 1000000) {
          color = "red";
        }

        return <span style={{ color }}>{price.toLocaleString()} VNĐ</span>;
      },
    },

    {
      title: "Số lượng tồn kho",
      key: "soLuong",
      dataIndex: "soLuong",
      render: (text) => {
        let color = "";
        let label = "";

        if (text < 50) {
          color = "red";
          label = "Low Stock";
        } else if (text >= 50 && text <= 100) {
          color = "orange";
          label = "Medium Stock";
        } else {
          color = "green";
          label = "High Stock";
        }

        return (
          <span style={{ color }}>
            {text} ({label})
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Popconfirm
              title="Xoá sản phẩm"
              description="Bạn có chắc xoá sản phẩm này không?"
              onConfirm={() => confirm(record)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <div style={{ display: "flex", gap: 4 }}>
                <Space>
                  <Button danger>Xoá</Button>
                </Space>
              </div>
            </Popconfirm>
            <Space>
              <Button
                onClick={() => {
                  setEditModal(true);
                  console.log(record);

                  form.setFieldsValue({
                    tenSanPham: record.tenSanPham,
                    moTaSanPham: record.moTaSanPham,
                    loaiSanPham: record.loaiSanPham,
                    danhMucSanPham: record.danhMucSanPham,
                    giaSanPham: record.giaSanPham,
                    soLuong: record.soLuong,
                    sanPhamId: record.sanPhamId,
                  });
                }}
              >
                Sửa sản phẩm
              </Button>
            </Space>
          </div>
        );
      },
    },
  ];

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      const response = await fetch("/Product/update-product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.product) {
        const updatedProduct = data.product;

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.sanPhamId === updatedProduct.sanPhamId
              ? updatedProduct
              : product
          )
        );

        message.success("Cập nhật thành công!");
      } else {
        message.error("Không thể cập nhật sản phẩm. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      message.error("Đã xảy ra lỗi khi cập nhật sản phẩm!");
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
      setEditModal(false);
    }
  };

  const handleClickAdd = () => {
    setAddModal(true);
  };

  const handleSubmitAdd = async (values) => {
    try {
      setIsLoading(true);

      const response = await fetch("/Product/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.products) {
        fetchProducts();

        message.success("Thêm sản phẩm thành công!");
      } else {
        message.error("Không thể thêm sản phẩm. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      message.error("Đã xảy ra lỗi khi thêm sản phẩm!");
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
      setAddModal(false);
    }
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <div
          style={{
            padding: "10px 60px 10px 60px",
            display: "flex",
            gap: 4,
            flexDirection: "column",
          }}
        >
          <Information />
          <Button
            color="cyan"
            variant="solid"
            style={{ width: 300, marginLeft: "auto" }}
            onClick={handleClickAdd}
          >
            Thêm Sản Phẩm +
          </Button>
          <Table columns={columns} dataSource={products} bordered />
        </div>
      </Spin>
      <Modal
        title="Cập nhật thông tin sản phẩm"
        centered
        open={editModal}
        footer={null}
        onOk={() => console.log(1)}
        onCancel={() => setEditModal(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            tenSanPham: "",
            moTaSanPham: "",
            loaiSanPham: "",
            danhMucSanPham: "",
            giaSanPham: "",
            soLuong: "",
            sanPhamId: "",
          }}
        >
          <Form.Item label="Sản phẩm GUID" name="sanPhamId">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Tên sản phẩm"
            name="tenSanPham"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả sản phẩm"
            name="moTaSanPham"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Loại sản phẩm"
            name="loaiSanPham"
            rules={[
              { required: true, message: "Vui lòng nhập loại sản phẩm!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Danh mục sản phẩm"
            name="danhMucSanPham"
            rules={[{ required: true, message: "Vui lòng nhập danh mục!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá sản phẩm"
            name="giaSanPham"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="soLuong"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm sản phẩm"
        centered
        open={addModal}
        footer={null}
        onOk={() => console.log(1)}
        onCancel={() => setAddModal(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitAdd}
          initialValues={{
            tenSanPham: "",
            moTaSanPham: "",
            loaiSanPham: "",
            danhMucSanPham: "",
            giaSanPham: "",
            soLuong: "",
          }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="tenSanPham"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả sản phẩm"
            name="moTaSanPham"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Loại sản phẩm"
            name="loaiSanPham"
            rules={[
              { required: true, message: "Vui lòng nhập loại sản phẩm!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Danh mục sản phẩm"
            name="danhMucSanPham"
            rules={[{ required: true, message: "Vui lòng nhập danh mục!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá sản phẩm"
            name="giaSanPham"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="soLuong"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Dashboard;
