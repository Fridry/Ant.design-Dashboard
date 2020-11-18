import React, { useState, useEffect } from "react";

import { Row, Col, Divider, Card } from "antd";

import { useParams } from "react-router-dom";

import Layout from "../../../Components/Layout";
import api from "../../../services/api";
import Chart from "../../../Components/Chart";

const List = () => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const companyName = localStorage.getItem("@companyName");

  const getData = async () => {
    setLoading(true);

    const response = await api.get(`/unit/${id}`);

    setState(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartQuery = `?unitId=${id}`;

  const { name, email, phoneNumber, address, city } = state;

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Card title={companyName} loading={loading}>
            <p>
              <strong>Unidade: </strong> {name}
            </p>
            <p>
              <strong>Email: </strong> {email}
            </p>
            <p>
              <strong>Telefone: </strong> {phoneNumber}
            </p>
            <p>
              <strong>Endereço: </strong> {address}
            </p>
            <p>
              <strong>Cidade: </strong> {city}
            </p>

            <Divider />

            <Chart query={chartQuery} />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default List;
