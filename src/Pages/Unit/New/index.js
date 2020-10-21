import React from "react";
import { Form, Input, Button, Row, Col, Card, message, Select } from "antd";

import api from "../../../services/api";

import Layout from "../../../Components/Layout";

const { Option } = Select;

const New = () => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 4 },
  };

  const onFinish = async (values) => {
    try {
      await api.post("/unit", values);

      form.resetFields();

      message.info("Empresa cadastrada com sucesso.");
    } catch (error) {
      message.error("Erro ao cadastrar empresa, tente novamente.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Ocorreu um erro ao cadastrar empresa, tente novamente.");
  };

  return (
    <Layout>
      <Row>
        <Col span={18} offset={3}>
          <Card title="Cadastrar unidade" align="start">
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
                label="Endereço"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Campo Endereço obrigatório!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Cidade"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Campo Cidade obrigatório!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="company"
                label="Empresa"
                rules={[{ required: true }]}
              >
                <Select placeholder="Selecione uma empresa" allowClear>
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
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
