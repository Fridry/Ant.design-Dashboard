import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Card, message, Select } from "antd";

import api from "../../../services/api";

import Layout from "../../../Components/Layout";

const { Option } = Select;

const New = () => {
  const [form] = Form.useForm();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const companyName = localStorage.getItem("@companyName");
  const companyId = localStorage.getItem("@companyId");

  const layout = {
    labelCol: { span: 4 },
  };

  const getData = async () => {
    setLoading(true);

    const response = await api.get("/company");

    setCompanies(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinish = async (values) => {
    try {
      let data = values;

      if (companyName !== "Administrador") {
        data = { ...values, company: companyId };
      }

      await api.post("/unit", data);

      form.resetFields();

      message.info("Unidade cadastrada com sucesso.");
    } catch (error) {
      message.error("Erro ao cadastrar unidade, tente novamente.");
    }
  };

  const onFinishFailed = () => {
    message.error("Ocorreu um erro ao cadastrar unidade, tente novamente.");
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

              {companyName === "Administrador" && (
                <Form.Item
                  name="company"
                  label="Empresa"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Selecione uma empresa"
                    allowClear
                    loading={loading}
                  >
                    {companies.map((company) => (
                      <Option value={company._id} key={company._id}>
                        {company.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

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
