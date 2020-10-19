import React, { useState, useEffect } from "react";

import {
  Button,
  Row,
  Col,
  Table,
  Space,
  Popconfirm,
  message,
  Typography,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import Layout from "../../../Components/Layout";
import api from "../../../services/api";

const { Title } = Typography;

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/company")
      .then((response) => {
        setData(
          response.data.map((row) => ({
            key: row._id,
            name: row.name,
            email: row.email,
            phone: row.phoneNumber,
            address: row.address,
            city: row.city,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [data]);

  const handleDelete = async (key) => {
    try {
      await api.delete(`/company/${key}`);

      setData(data.filter((d) => d.key !== key));

      message.info("Registro excluido com sucesso.");
    } catch (error) {
      message.error("Erro ao excluir registro, tente novamente.");
    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Endereço",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Cidade",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) =>
        data.length >= 1 ? (
          <Space size="middle" align="center">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size={25}
              style={{ background: "#ffec3d", border: "none" }}
              title="Editar"
            />

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
        ) : null,
    },
  ];

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Table
            dataSource={data}
            columns={columns}
            bordered={true}
            title={() => (
              <Title style={{ textAlign: "center" }} level={3}>
                Empresas cadastradas
              </Title>
            )}
            size="small"
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default List;
