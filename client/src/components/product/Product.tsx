import React from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import { createProduct } from "../../service/requestApi/admin";

export interface Product {
  description?: string;
  product_id_name: string;
  product_name: string;
  quantity_stock: number;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",

  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const Product: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: Product) => {
    try {
      const response = await createProduct(values);
      if (response.data.status === 201) {
        message.success("Add Product Success!");
        form.resetFields();
      }
    } catch (error) {}
  };

  return (
    <Form
      {...layout}
      form={form}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="product_name"
        label="Product name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="product_id_name"
        label="Product ID"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="quantity_stock"
        label="Quantity"
        rules={[{ type: "number", min: 0, required: true }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Product;
