import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Card, message, Select } from "antd";

import api from "../../../services/api";

import Layout from "../../../Components/Layout";

const { Option } = Select;

const New = () => {
  const [form] = Form.useForm();
  const [unities, setUnities] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const companyName = localStorage.getItem("@companyName");
  const companyId = localStorage.getItem("@companyId");

  const layout = {
    labelCol: { span: 4 },
  };

  const getData = async () => {
    setLoading(true);

    const query =
      companyName !== "Administrador" ? `/unit?company=${companyId}` : "/unit";

    const unitResponse = await api.get(query);
    const companyResponse = await api.get("/company");

    setUnities(unitResponse.data);
    setCompanies(companyResponse.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async (values) => {
    try {
      let data = values;

      if (companyName !== "Administrador") {
        data = { ...values, company: companyId };
      }

      await api.post("/users", data);

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
