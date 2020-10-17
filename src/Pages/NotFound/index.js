import React from "react";
import { useLocation } from "react-router-dom";

import { Typography } from "antd";

import Layout from "../../Components/Layout";

const { Title } = Typography;

const NotFound = () => {
  let location = useLocation();
  return (
    <Layout>
      <Title>
        Página <code>{location.pathname}</code> não encontrada.
      </Title>
    </Layout>
  );
};

export default NotFound;
