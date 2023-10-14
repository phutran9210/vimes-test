import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, InputNumber, Row, Col } from "antd";
import {
  getEmployeeByPosition,
  createReceipts,
} from "../../service/requestApi/admin";
import InputProductId from "./searchInput/InputProductId";
import ConfirmationModal from "./modal/ConfirmationModal ";
// dữ liệu nhân viên theo position
export interface PositionInterface {
  position_id: number;
  position_name: string;
}

export interface EmployeeInterface {
  employee_id: number;
  employee_name: string;
  positions: PositionInterface[];
}
interface employeeData {
  allEmployee: EmployeeInterface[];
  warehouseEmployee: EmployeeInterface[];
  accounttantEmployee: EmployeeInterface[];
}
//dữ liệu form
interface Receipts {
  delivery_persons: string;
  receipts_notes: string;
  created_by_employee_id: number;
  warehouse_employee_id: number;
  accounttant_employee_id: number;
}

interface ReceiptsDetail {
  actual_quantity: number;
  debt: boolean;
  document_quantity: number;
  product_id: number;
  product_id_name: string;
  receipts_notes: string;
  receiving_department: string;
  receiving_place: string;
  receiving_unit: string;
  unit_type: string;
  unit_price: string;
}

export interface FormData {
  receipts: Receipts;
  receiptsDetail: ReceiptsDetail;
}

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const WarehouseEntryForm: React.FC = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [employeeByPosition, setEmployeeByPosition] = useState<employeeData>();
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [actualQuantity, setActualQuantity] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedProductName, setSelectedProductName] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any | null>(null);

  //lấy dữ liệu nhân viên theo position
  useEffect(() => {
    const getPositionData = async () => {
      try {
        const response = await getEmployeeByPosition();
        if (response.data.status === 200) {
          setEmployeeByPosition(response.data.result);
        }
      } catch (error) {}
    };
    getPositionData();
  }, []);

  //tính tổng tiền dựa theo giá tiền + số lượng thực nhập
  useEffect(() => {
    setTotalAmount(unitPrice * actualQuantity);
  }, [unitPrice, actualQuantity]);

  const onFinish = async (values: any) => {
    const receipts: Receipts = {
      delivery_persons: values.delivery_persons,
      receipts_notes: values.receipts_notes,
      created_by_employee_id: +values.created_by_employee_id,
      warehouse_employee_id: +values.warehouse_employee_id,
      accounttant_employee_id: +values.accounttant_employee_id,
    };

    const receiptsDetail: ReceiptsDetail = {
      actual_quantity: values.actual_quantity,
      debt: values.debt === "yes" ? true : false,
      product_id: selectedProductName.product_id,
      document_quantity: values.document_quantity,
      product_id_name: selectedProductName.product_id_name,
      receipts_notes: values.receipts_notes,
      receiving_department: values.receiving_department,
      receiving_place: values.receiving_place,
      receiving_unit: values.receiving_unit,
      unit_type: values.unit_type,
      unit_price: values.unit_price,
    };

    const payload = {
      receipts: receipts,
      receiptsDetail: receiptsDetail,
    };
    try {
      const response = await createReceipts(payload);
      if (response.data.status === 201) {
        form.resetFields();
        setResponseData(response.data.result);
        setIsModalVisible(true);
      }
    } catch (error) {}
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ debt: "no" }}
        form={form}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              style={{ width: "15%" }}
              label="Nợ"
              name="debt"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="yes">Có</Option>
                <Option value="no">Không</Option>
              </Select>
            </Form.Item>

            <Form.Item
              // rules={[{ required: true }]}
              label="Mã số sản phẩm"
              name="product_id_name"
            >
              <InputProductId onProductNameChange={setSelectedProductName} />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Tên sản phẩm"
              // name="productName"
            >
              <Input
                value={selectedProductName?.product_name}
                style={{ width: "80%" }}
                placeholder="Nhập tên sản phẩm"
              />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Đơn vị tính"
              name="unit_type"
            >
              <Input
                min={0}
                style={{ width: "20%" }}
                placeholder="Nhập đơn vị tính"
              />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Số lượng (theo chứng từ)"
              name="document_quantity"
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Số lượng (thực nhận)"
              name="actual_quantity"
            >
              <InputNumber
                onChange={(value) => setActualQuantity(value ? +value : 0)}
                min={0}
              />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Đơn giá"
              name="unit_price"
            >
              <InputNumber
                onChange={(value) => setUnitPrice(value ? +value : 0)}
                min={0}
              />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Thành tiền"
              // name="totalAmount"
            >
              <InputNumber min={0} value={totalAmount} readOnly />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              rules={[{ required: true }]}
              label="Tên kho nhận hàng"
              name="receiving_place"
            >
              <Input style={{ width: "80%" }} placeholder="Nhập tên kho nhận" />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Đơn vị nhận"
              name="receiving_unit"
            >
              <Input style={{ width: "80%" }} placeholder="Nhập đơn vị nhận" />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Bộ phận nhận"
              name="receiving_department"
            >
              <Input style={{ width: "80%" }} placeholder="Nhập bộ phận nhận" />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Người lập phiếu"
              name="created_by_employee_id"
            >
              <Select
                showSearch
                placeholder="Nhận tên nhân viên"
                optionFilterProp="children"
                filterOption={filterOption}
                style={{ width: "80%" }}
                options={employeeByPosition?.allEmployee?.map((item) => ({
                  value: item.employee_id.toString(),
                  label: item.employee_name,
                }))}
              />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Người thủ kho"
              name="warehouse_employee_id"
            >
              <Select
                showSearch
                placeholder="Nhận tên nhân viên"
                optionFilterProp="children"
                filterOption={filterOption}
                style={{ width: "80%" }}
                options={employeeByPosition?.warehouseEmployee?.map((item) => ({
                  value: item.employee_id.toString(),
                  label: item.employee_name,
                }))}
              />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Kế toán"
              name="accounttant_employee_id"
            >
              <Select
                showSearch
                placeholder="Nhận tên nhân viên"
                optionFilterProp="children"
                filterOption={filterOption}
                style={{ width: "80%" }}
                options={employeeByPosition?.accounttantEmployee?.map(
                  (item) => ({
                    value: item.employee_id.toString(),
                    label: item.employee_name,
                  })
                )}
              />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              label="Họ tên người giao"
              name="delivery_persons"
            >
              <Input
                style={{ width: "80%" }}
                placeholder="Nhập tên người giao"
              />
            </Form.Item>

            <Form.Item
              rules={[{ required: true }]}
              name="receipts_notes"
              label="Khác (chứng từ,ghi chú,...)"
            >
              <Input.TextArea style={{ width: "80%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
      <ConfirmationModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setResponseData(null);
        }}
        data={responseData}
      />
    </>
  );
};

export default WarehouseEntryForm;
