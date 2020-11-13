import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Layout, Card, Form, Button, Select, notification } from "antd";

import api from "../../services/api";

import "./style.css";

const { Option } = Select;

const Login = () => {
  const history = useHistory();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

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
    let name = "";

    if (values.company !== "admin") {
      const company = companies.filter((c) => c._id === values.company);

      name = company[0].name;
    } else {
      name = "Administrador";
    }

    localStorage.setItem("@companyId", values.company);
    localStorage.setItem("@companyName", name);

    history.push("/");
  };

  const onFinishFailed = () => {
    notification["error"]({
      message: "Erro ao acessar o sistema. Tente novamente.",
    });
  };

  return (
    <Layout className="layout">
      <Card title="Login">
        <Form
          name="Login"
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="company"
            rules={[
              {
                required: true,
                message: "Selecione uma empresa para prosseguir",
              },
            ]}
          >
            <Select
              placeholder="Selecione uma empresa"
              allowClear
              loading={loading}
              style={{ width: 250 }}
            >
              <Option value="admin" key="admin">
                Administrador
              </Option>
              {companies.map((company) => (
                <Option value={company._id} key={company._id}>
                  {company.name}
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
    </Layout>
  );
};

export default Login;
