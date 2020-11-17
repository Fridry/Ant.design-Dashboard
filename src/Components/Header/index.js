import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();

    history.push("/login");
  };

  return (
    <Header className="header">
      <Menu theme="dark">
        <Menu.Item
          key="logout"
          onClick={logout}
          style={{ float: "right", padding: 5, color: "white" }}
        >
          Sair
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
