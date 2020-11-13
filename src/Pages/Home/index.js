import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Divider } from "antd";

import Layout from "../../Components/Layout";
import Chart from "../../Components/Chart";

const { Title } = Typography;

const Home = () => {
  const history = useHistory();

  const companyName = localStorage.getItem("@companyName");
  const companyId = localStorage.getItem("@companyId");

  if (!companyId) {
    history.push("/login");
  }

  return (
    <div>
      <Layout>
        <Title style={{ textAlign: "center" }}>
          Seja bem-vindo{" "}
          {companyName === "Administrador"
            ? companyName
            : `ao painel da ${companyName}`}
        </Title>

        <Divider />

        <Chart />
      </Layout>
    </div>
  );
};

export default Home;
