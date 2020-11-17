import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  message,
  Select,
  InputNumber,
  Spin,
} from "antd";

import api from "../../../services/api";

import Layout from "../../../Components/Layout";

const { Option } = Select;

const New = () => {
  const [form] = Form.useForm();
  const [unities, setUnities] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const companyName = localStorage.getItem("@companyName");
  const companyId = localStorage.getItem("@companyId");

  const [search, setSearch] = useState({
    data: [],
    value: "",
    fetching: false,
  });

  const layout = {
    labelCol: { span: 4 },
  };

  const getData = async () => {
    setLoading(true);

    const queryUnit =
      companyName !== "Administrador" ? `/unit?company=${companyId}` : "/unit";

    const queryUser =
      companyName !== "Administrador"
        ? `/users?companyId=${companyId}`
        : "/users";

    const unitResponse = await api.get(queryUnit);
    const companyResponse = await api.get("/company");
    const categoryResponse = await api.get("/category");
    const userResponse = await api.get(queryUser);

    setUnities(unitResponse.data);
    setCompanies(companyResponse.data);
    setCategories(categoryResponse.data);
    setUsers(userResponse.data);

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

      await api.post("/asset", data);

      form.resetFields();

      message.info("Ativo cadastrada com sucesso.");
    } catch (error) {
      message.error("Erro ao cadastrar ativo, tente novamente.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Ocorreu um erro ao cadastrar ativo, tente novamente.");
  };

  const handleChange = (value) => {
    setSearch({
      value,
      data: [],
      fetching: false,
    });
  };

  return (
    <Layout>
      <Row>
        <Col span={18} offset={3}>
          <Card title="Cadastrar ativos" align="start">
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
                label="Descrição"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Campo Descrição obrigatório!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="category"
                label="Categoria"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Selecione uma categoria"
                  allowClear
                  loading={loading}
                >
                  {categories.map((category) => (
                    <Option value={category._id} key={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Modelo"
                name="model"
                rules={[
                  {
                    required: true,
                    message: "Campo Modelo obrigatório!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Ano"
                name="year"
                rules={[
                  {
                    required: true,
                    message: "Campo Ano obrigatório!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Imagem"
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Campo Image obrigatório!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Nível de Saúde"
                name="healthscore"
                rules={[
                  {
                    required: true,
                    message: "Campo Nível de Saúde obrigatório!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Select placeholder="Selecione um status" allowClear>
                  <Option value="Disponível">Disponível</Option>
                  <Option value="Em manutenção">Em manutenção</Option>
                  <Option value="Desativado">Desativado</Option>
                </Select>
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

              <Form.Item
                name="responsible"
                label="Responsável"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  allowClear
                  notFoundContent={
                    search.fetching ? (
                      <Spin size="small" />
                    ) : (
                      "Usuário não encontrado"
                    )
                  }
                  onChange={handleChange}
                  // onSearch={fetchUser}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {users.map((user) => (
                    <Option value={user._id} key={user._id}>
                      {user.name}
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
