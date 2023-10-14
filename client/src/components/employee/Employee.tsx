import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Modal } from "antd";
import { getPosition, createEmployee } from "../../service/requestApi/admin";

export interface PositionInterface {
  position_id: number;
  position_name: string;
}

export interface EmployeeInfo {
  employee_name: string;
  position_name: string;
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Employee: React.FC = () => {
  const [form] = Form.useForm();
  const [items, setItems] = useState<PositionInterface[]>([]);

  useEffect(() => {
    const getPositionData = async () => {
      try {
        const response = await getPosition();
        setItems(response.data.result);
      } catch (error) {}
    };
    getPositionData();
  }, []);

  const handleSubmit = async (values: EmployeeInfo) => {
    try {
      const response = await createEmployee(values);
      if (response.data.status === 200) {
        const createdEmploy = response.data.result;
        form.resetFields();
        Modal.success({
          title: "Employee Created",
          content: (
            <div>
              <p>
                <strong>Name:</strong> {createdEmploy.employee_name}
              </p>
              <p>
                <strong>ID:</strong> {createdEmploy.employee_id}
              </p>
              <p>
                <strong>Positions:</strong>{" "}
                {capitalizeFirstLetter(
                  createdEmploy.positions[0].position_name
                )}
              </p>
            </div>
          ),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      form={form}
      style={{ maxWidth: 600 }}
      {...layout}
    >
      <Form.Item
        label="Tên nhân viên"
        name="employee_name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Chức vụ"
        name="position_name"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select Position"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={items.map((item) => ({
            value: item.position_name,
            label: capitalizeFirstLetter(item.position_name),
          }))}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Employee;
