import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  Button,
  Row,
  Col,
  Table,
  Space,
  Popconfirm,
  message,
  Typography,
  Form,
} from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import Layout from "../../../Components/Layout";
import Modal from "../../../Components/Modal";
import api from "../../../services/api";

const { Title } = Typography;

const List = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  const companyId = localStorage.getItem("@companyId");

  const getData = async () => {
    setLoading(true);

    const response = await api.get(`asset?company=${companyId}`);

    setState(response.data);
    setLoading(false);
  };

  // console.log(state);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = state.map((row) => ({
    key: row._id,
    name: row.name,
    model: row.model,
    year: row.year,
    status: row.status,
    healthscore: row.healthscore,
    unit: row.unit.name,
    category: row.category.name,
    responsible: row.responsible.name,
  }));

  const handleDelete = async (key) => {
    try {
      await api.delete(`/asset/${key}`);

      getData();

      message.info("Registro excluido com sucesso.");
    } catch (error) {
      message.error("Erro ao excluir registro, tente novamente.");
    }
  };

  const actions = (record) => (
    <Space size="middle" align="center">
      <Modal asset={state[state.findIndex((i) => i._id === record.key)]} />

      <Link
        to={{
          pathname: "/asset/edit",
          state: { asset: state[state.findIndex((i) => i._id === record.key)] },
        }}
      >
        <Button
          type="primary"
          icon={<EditOutlined />}
          size={25}
          style={{ background: "#ffec3d", border: "none" }}
          title="Editar"
        />
      </Link>

      <Popconfirm
        title="Deseja excluir este registro?"
        onConfirm={() => handleDelete(record.key)}
      >
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          title="Excluir"
        />
      </Popconfirm>
    </Space>
  );

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
      title: "Modelo",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Ano",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Nível de Saúde",
      dataIndex: "healthscore",
      key: "healthscore",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Categoria",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Responsável",
      dataIndex: "responsible",
      key: "responsible",
    },
    {
      title: "Unidade",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => actions(record),
    },
  ];

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Form form={form} component={false}>
            <Table
              dataSource={data}
              columns={columns}
              rowClassName="editable-row"
              bordered
              title={() => <Title level={5}>Ativos cadastrados</Title>}
              size="small"
              pagination={{ position: ["bottomCenter"] }}
              loading={loading}
            />
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default List;
