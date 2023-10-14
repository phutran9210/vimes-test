import React from "react";
import { Modal, Descriptions } from "antd";

interface Employee {
  employee_id: number;
  employee_name: string;
  positions: { position_id: number; position_name: string }[];
}

interface ReceiptsDetail {
  actual_quantity: number;
  receipts_id: number;
  document_quantity: number;
  unit_price: number;
  unit_type: string;
  receiving_place: string;
  in_debt: boolean;
  receiving_unit: string;
  receiving_department: string;
  receipt: any;
  product: {
    product_id: number;
    product_name: string;
    product_id_name: string;
    description: string | null;
    quantity_stock: number;
  };
  detail_id: number;
}

interface Data {
  receipts: {
    delivery_persons: string;
    receipts_notes: string;
    receipts_id: number;
    receipts_date: string;
    createdBy: Employee;
    warehouseEmployee: Employee;
    accountantEmployee: Employee;
  };
  receiptsDetail: ReceiptsDetail;
}

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  data: Data;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  data,
}) => {
  return (
    <Modal
      title="Thông Tin Xác Nhận Tạo Phiếu Nhập Kho"
      open={visible}
      onCancel={onClose}
      footer={null}
      width="75%"
    >
      <Descriptions
        style={{ color: "red" }}
        title="Thông Tin Phiếu Nhập Kho"
        bordered
      >
        <Descriptions.Item label="Người Giao">
          {data?.receipts.delivery_persons}
        </Descriptions.Item>
        <Descriptions.Item label="Ghi Chú">
          {data?.receipts.receipts_notes}
        </Descriptions.Item>
        <Descriptions.Item label="Mã Phiếu Nhập">
          {data?.receipts.receipts_id}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày Nhập">
          {new Date(data?.receipts.receipts_date).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Người Tạo">
          {data?.receipts.createdBy.employee_name}
        </Descriptions.Item>
        <Descriptions.Item label="Nhân Viên Kho">
          {data?.receipts.warehouseEmployee.employee_name}
        </Descriptions.Item>
        <Descriptions.Item label="Kế Toán">
          {data?.receipts.accountantEmployee.employee_name}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        title="Thông Tin Chi Tiết Phiếu Nhập"
        bordered
        style={{ marginTop: 20 }}
      >
        <Descriptions.Item label="Số Lượng Thực Tế">
          {data?.receiptsDetail.actual_quantity}
        </Descriptions.Item>
        <Descriptions.Item label="Số Lượng Theo Hóa Đơn">
          {data?.receiptsDetail.document_quantity}
        </Descriptions.Item>
        <Descriptions.Item label="Đơn Giá">
          {data?.receiptsDetail.unit_price}
        </Descriptions.Item>
        <Descriptions.Item label="Đơn Vị">
          {data?.receiptsDetail.unit_type}
        </Descriptions.Item>
        <Descriptions.Item label="Nơi Nhận">
          {data?.receiptsDetail.receiving_place}
        </Descriptions.Item>
        <Descriptions.Item label="Đơn Vị Nhận">
          {data?.receiptsDetail.receiving_unit}
        </Descriptions.Item>
        <Descriptions.Item label="Bộ Phận Nhận">
          {data?.receiptsDetail.receiving_department}
        </Descriptions.Item>
        <Descriptions.Item label="Sản Phẩm">
          {data?.receiptsDetail.product.product_name}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ConfirmationModal;
