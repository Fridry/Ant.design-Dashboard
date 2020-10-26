import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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

const Edit = ({ location }) => {
  const [form] = Form.useForm();
  const [unities, setUnities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const [search, setSearch] = useState({
    data: [],
    value: "",
    fetching: false,
  });

  const {
    _id,
    name,
    description,
    model,
    year,
    image,
    status,
    healthscore,
    unit,
    category,
    responsible,
  } = location.state.asset;

  const editValues = {
    name: name,
    description: description,
    model: model,
    year: year,
    image: image,
    status: status,
    healthscore: healthscore,
    unit: unit._id,
    category: category._id,
    responsible: responsible._id,
  };

  const layout = {
    labelCol: { span: 4 },
  };

  const getData = async () => {
    setLoading(true);

    const unitResponse = await api.get("/unit");
    const categoryResponse = await api.get("/category");
    const userResponse = await api.get("/users");

    setUnities(unitResponse.data);
    setCategories(categoryResponse.data);
    setUsers(userResponse.data);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinish = async (values) => {
    try {
      await api.put(`/asset/${_id}`, values);

      form.resetFields();

      message.info("Ativo cadastrada com sucesso.");

      goBack();
    } catch (error) {
      message.error("Erro ao cadastrar ativo, tente novamente.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Ocorreu um erro ao cadastrar ativo, tente novamente.");
  };

  // const fetchUser = async (value) => {
  //   setSearch({ data: [], fetching: true });

  //   const response = await api.get("/users");

  //   setSearch({ data: response.data, fetching: false });
  // };

  const handleChange = (value) => {
    setSearch({
      value,
      data: [],
      fetching: false,
    });
  };

  const goBack = () => {
    history.push("/asset/list");
  };

  return (
    <Layout>
      <Row>
        <Col span={18} offset={3}>
          <Card title="Atualizar ativos" align="start">
            <Form
              name="Create"
              form={form}
              {...layout}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={editValues}
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
                <img
                  src={image}
                  alt="Asset"
                  style={{
                    width: 300,
                    display: "block",
                    margin: "20px auto",
                  }}
                />
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button type="primary" htmlType="submit">
                    Atualizar
                  </Button>

                  <Button type="default" htmlType="button" onClick={goBack}>
                    Voltar
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Edit;
