import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  ShopOutlined,
  CaretRightOutlined,
  SettingOutlined,
  ProfileOutlined,
  GroupOutlined,
} from "@ant-design/icons";

import "./styles.css";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo">
        <CaretRightOutlined />
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>

        <SubMenu key="sub1" icon={<ShopOutlined />} title="Empresas">
          <Menu.Item key="3">
            <Link to="/company/new">Cadastrar empresa</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/company/list">Listar empresas</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<GroupOutlined />} title="Unidades">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<SettingOutlined />} title="Ativos">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<TeamOutlined />} title="Usuários">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" icon={<ProfileOutlined />} title="Categorias">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
