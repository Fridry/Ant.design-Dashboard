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
  Form,
  Input,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import Layout from "../../../Components/Layout";
import api from "../../../services/api";

const { Title } = Typography;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Campo ${title} obrigatório!`,
              type: title === "Email" ? "email" : "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const List = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const companyName = localStorage.getItem("@companyName");
  const companyId = localStorage.getItem("@companyId");

  const getData = async () => {
    setLoading(true);

    const query =
      companyName === "Administrador"
        ? "/users"
        : `/users?companyId=${companyId}`;

    const response = await api.get(query);

    setState(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = state.map((row) => ({
    key: row._id,
    name: row.name,
    email: row.email,
    phoneNumber: row.phoneNumber,
    unit: row.unit ? row.unit.name : "",
  }));

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      phoneNumber: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const rowData = await form.validateFields();

      await api.put(`/users/${key}`, rowData);

      form.resetFields();

      message.info("Usuário atualizado com sucesso.");

      setEditingKey("");

      getData();
    } catch (error) {
      message.error("Erro ao atualizar usuário, tente novamente.");
    }
  };

  const handleDelete = async (key) => {
    try {
      await api.delete(`/users/${key}`);

      getData();

      message.info("Registro excluido com sucesso.");
    } catch (error) {
      message.error("Erro ao excluir registro, tente novamente.");
    }
  };

  const actions = (record) => {
    const editable = isEditing(record);

    return editable ? (
      <Space size="middle" align="center">
        <Button
          type="primary"
          icon={<CheckOutlined />}
          size={25}
          style={{ background: "#52c41a", border: "none" }}
          title="Salvar"
          onClick={() => save(record.key)}
        />

        <Button
          type="primary"
          icon={<CloseOutlined />}
          size={25}
          style={{ background: "#595959", border: "none" }}
          title="Cancelar"
          onClick={cancel}
        />
      </Space>
    ) : data.length >= 1 ? (
      <Space size="middle" align="center">
        <Button
          type="primary"
          icon={<EditOutlined />}
          size={25}
          style={{ background: "#ffec3d", border: "none" }}
          title="Editar"
          disabled={editingKey !== ""}
          onClick={() => edit(record)}
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
    ) : null;
  };

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
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
    },
    {
      title: "Telefone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      editable: true,
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              bordered
              title={() => <Title level={5}>Unidades cadastradas</Title>}
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
