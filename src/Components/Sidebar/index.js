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
import { NavLink, useLocation } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  let location = useLocation();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const persistKey = (drop) => {
    localStorage.removeItem("@dropdowKey");

    localStorage.setItem("@dropdowKey", drop);
  };

  const getKey = () => {
    return localStorage.getItem("@dropdowKey");
  };

  const companyName = localStorage.getItem("@companyName");

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo">
        <CaretRightOutlined />
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["/"]}
        selectedKeys={[location.pathname]}
        defaultOpenKeys={[getKey()]}
        mode="inline"
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <NavLink to="/" onClick={() => persistKey("/")}>
            Home
          </NavLink>
        </Menu.Item>

        {companyName === "Administrador" ? (
          <SubMenu key="company" icon={<ShopOutlined />} title="Empresas">
            <Menu.Item key="/company/new">
              <NavLink to="/company/new" onClick={() => persistKey("company")}>
                Cadastrar empresa
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/company/list">
              <NavLink to="/company/list" onClick={() => persistKey("company")}>
                Listar empresas
              </NavLink>
            </Menu.Item>
          </SubMenu>
        ) : (
          ""
        )}
        <SubMenu key="unit" icon={<GroupOutlined />} title="Unidades">
          <Menu.Item key="/unit/new">
            <NavLink to="/unit/new" onClick={() => persistKey("unit")}>
              Cadastrar unidade
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/unit/list">
            <NavLink to="/unit/list" onClick={() => persistKey("unit")}>
              Listar unidades
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="asset" icon={<SettingOutlined />} title="Ativos">
          <Menu.Item key="/asset/new">
            <NavLink to="/asset/new" onClick={() => persistKey("asset")}>
              Cadastrar ativo
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/asset/list">
            <NavLink to="/asset/list" onClick={() => persistKey("asset")}>
              Listar ativos
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="user" icon={<TeamOutlined />} title="Usuários">
          <Menu.Item key="/user/new">
            <NavLink to="/user/new" onClick={() => persistKey("user")}>
              Cadastrar usuário
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/user/list">
            <NavLink to="/user/list" onClick={() => persistKey("user")}>
              Listar usuários
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="category" icon={<ProfileOutlined />} title="Categorias">
          <Menu.Item key="/category/new">
            <NavLink
              to="/category/new"
              onClick={() => persistKey("category")}
              category
            >
              Cadastrar categoria
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/category/list">
            <NavLink
              to="/category/list"
              onClick={() => persistKey("category")}
              category
            >
              Listar categorias
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
