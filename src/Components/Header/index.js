import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header className="header">
      <Menu theme="dark">
        <Menu.Item
          key="3"
          style={{ float: "right", padding: 5, color: "white" }}
        >
          Sair
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
