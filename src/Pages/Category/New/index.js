import React from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";

import api from "../../../services/api";

import Layout from "../../../Components/Layout";

const { TextArea } = Input;

const New = () => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 4 },
  };

  const onFinish = async (values) => {
    try {
      await api.post("/category", values);

      form.resetFields();

      message.info("Categoria cadastrada com sucesso.");
    } catch (error) {
      message.error("Erro ao cadastrar categoria, tente novamente.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Ocorreu um erro ao cadastrar a categoria, tente novamente.");
  };

  return (
    <Layout>
      <Row>
        <Col span={18} offset={3}>
          <Card title="Cadastrar categoria" align="start">
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
                <TextArea rows={4} />
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
