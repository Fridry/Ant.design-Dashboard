import React, { useState, useEffect } from "react";

import { Row, Col, Table, Typography, Divider, Card } from "antd";

import { useParams } from "react-router-dom";

import Layout from "../../../Components/Layout";
import api from "../../../services/api";
import Chart from "../../../Components/Chart";

const { Title } = Typography;

const List = () => {
  const [state, setState] = useState({});
  const [unities, setUnities] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getData = async () => {
    setLoading(true);

    const unitResponse = await api.get(`/unit?company=${id}`);
    const companyResponse = await api.get(`/company/${id}`);
    const assetsResponse = await api.get(`asset?company=${id}`);

    setUnities(unitResponse.data);
    setState(companyResponse.data);
    setAssets(assetsResponse.data);
    setLoading(false);

    console.log(assets);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = unities.map((row) => ({
    key: row._id,
    name: row.name,
    email: row.email,
    phoneNumber: row.phoneNumber,
    address: row.address,
    city: row.city,
  }));

  const sorter = (a, b) =>
    isNaN(a) && isNaN(b) ? (a || "").localeCompare(b || "") : a - b;

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      editable: true,
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => sorter(a.name, b.name),
      defaultSortOrder: "ascend",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
    },
    {
      title: "Telefone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      editable: true,
    },
    {
      title: "Endereço",
      dataIndex: "address",
      key: "address",
      editable: true,
    },
    {
      title: "Cidade",
      dataIndex: "city",
      key: "city",
      editable: true,
    },
  ];

  const { name, email, phoneNumber, address, city } = state;

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Card title={name} loading={loading}>
            <p>
              <strong>Nome da empresa: </strong> {name}
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

            <Table
              dataSource={data}
              columns={columns}
              rowClassName="editable-row"
              bordered
              title={() => <Title level={5}>Unidades</Title>}
              size="small"
              pagination={{ position: ["bottomCenter"] }}
              loading={loading}
            />

            <Divider />

            <Chart />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default List;
