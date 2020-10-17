import React from "react";
import { Layout } from "antd";

import Header from "../Header";
import Sidebar from "../Sidebar";

import "./styles.css";

const { Content } = Layout;

const LayoutComponent = ({ children }) => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Layout>
        <Sidebar />

        <Layout>
          <Header />
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                marginTop: 16,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
