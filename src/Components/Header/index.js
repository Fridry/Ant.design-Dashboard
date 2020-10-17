import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header className="header">
      <Menu theme="dark" />
    </Header>
  );
};

export default HeaderComponent;
