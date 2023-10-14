import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AuditOutlined,
  UserAddOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import Employee from "./employee/Employee";
import WarehouseEntryForm from "./receipts/Receipts";
import Product from "./product/Product";

const { Header, Sider, Content } = Layout;

const items = [
  {
    key: "1",
    icon: <UserAddOutlined />,
    label: "Employee",
  },
  {
    key: "2",
    icon: <AuditOutlined />,
    label: "Receipts",
  },
  {
    key: "3",
    icon: <ShopOutlined />,
    label: "Product",
  },
];

const Admin: React.FC = () => {
  const initialSelectedKey =
    new URLSearchParams(location.search).get("selected") || "sub1";
  const [selectedKey, setSelectedKey] = useState(initialSelectedKey);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
    navigate(`/?selected=${key}`);
  };

  const renderComponent = () => {
    switch (selectedKey) {
      case "1":
        return <Employee />;
      case "2":
        return <WarehouseEntryForm />;
      case "3":
        return <Product />;
      default:
        return <Employee />;
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          onSelect={handleMenuSelect}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{
            height: "98vh",
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {renderComponent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
