import React from "react";

import { Typography, Divider } from "antd";

import Layout from "../../Components/Layout";
import Chart from "../../Components/Chart";

const { Title } = Typography;

const Home = () => {
  return (
    <div>
      <Layout>
        <Title style={{ textAlign: "center" }}>Seja bem-vindo</Title>

        <Divider />

        <Chart />
      </Layout>
    </div>
  );
};

export default Home;
