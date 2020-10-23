import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Card, message, Select } from "antd";

import api from "../../../services/api";

import Layout from "../../../Components/Layout";

const { Option } = Select;

const New = () => {
  const [form] = Form.useForm();
  const [unities, setUnities] = useState([]);
  const [loading, setLoading] = useState(false);

  const layout = {
    labelCol: { span: 4 },
  };

  const getData = async () => {
    setLoading(true);

    const response = await api.get("/unit");

    setUnities(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinish = async (values) => {
    try {
      await api.post("/users", values);

      form.resetFields();

      message.info("Usuário cadastrada com sucesso.");
    } catch (error) {
      message.error("Erro ao cadastrar usuário, tente novamente.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Ocorreu um erro ao cadastrar usuário, tente novamente.");
  };

  return (
    <Layout>
      <Row>
        <Col span={18} offset={3}>
          <Card title="Cadastrar usuário" align="start">
            <Form
              name="Create"
              form={form}
              {...layout}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Nome"
                name="name"
                rules={[{ required: true, message: "Campo Nome obrigatório!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Campo Email obrigatório!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Telefone"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Campo Telefone obrigatório!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Cargo"
                name="position"
                rules={[
                  {
                    required: true,
                    message: "Campo Cargo obrigatório!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="unit"
                label="Unidade"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Selecione uma unidade"
                  allowClear
                  loading={loading}
                >
                  {unities.map((unit) => (
                    <Option value={unit._id} key={unit._id}>
                      {unit.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Salvar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default New;
