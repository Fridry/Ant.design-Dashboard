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
  InputNumber,
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
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
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
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const List = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

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

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
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

      await api.put(`/company/${key}`, rowData);

      form.resetFields();

      message.info("Empresa atualizada com sucesso.");

      setEditingKey("");
    } catch (error) {
      message.error("Erro ao atualizar empresa, tente novamente.");
    }
  };

  const handleDelete = async (key) => {
    try {
      await api.delete(`/company/${key}`);

      setData(data.filter((d) => d.key !== key));

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
      dataIndex: "phone",
      key: "phone",
      editable: true,
    },
    {
      title: "Endereço",
      dataIndex: "address",
      key: "address",
      editable: true,
    },
    {
      title: "Cidade",
      dataIndex: "city",
      key: "city",
      editable: true,
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
        inputType: col.dataIndex === "age" ? "number" : "text",
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
              title={() => <Title level={5}>Empresas cadastradas</Title>}
              size="small"
              pagination={{ position: ["bottomCenter"] }}
            />
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default List;
