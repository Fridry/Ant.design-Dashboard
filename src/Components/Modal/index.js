import React, { Fragment, useState } from "react";
import { Modal, Button } from "antd";

import { InfoOutlined } from "@ant-design/icons";

const ModalComponent = ({ asset }) => {
  const {
    name,
    description,
    model,
    year,
    image,
    healthscore,
    status,
    category,
    responsible,
    unit,
  } = asset;

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  return (
    <Fragment>
      <Button
        type="primary"
        icon={<InfoOutlined />}
        onClick={showModal}
        size={25}
        style={{ border: "none" }}
        title="Detalhes"
      />
      <Modal
        title={name}
        visible={visible}
        onCancel={handleCancel}
        cancelText="Fechar"
        okButtonProps={{ hidden: true }}
        destroyOnClose={true}
      >
        <p>
          <strong>Descrição: </strong> {description}
        </p>
        <p>
          <strong>Modelo: </strong> {model}
        </p>
        <p>
          <strong>Ano: </strong> {year}
        </p>
        <p>
          <strong>Image: </strong>
          <img src={image} alt={name} style={{ width: 300 }} />
        </p>
        <p>
          <strong>Nível de Saúde: </strong> {healthscore}
        </p>
        <p>
          <strong>Status: </strong> {status}
        </p>
        <p>
          <strong>Categoria: </strong> {category.name}
        </p>
        <p>
          <strong>Unidade: </strong> {unit.name}
        </p>
        <p>
          <strong>Responsável:</strong> {responsible.name}
        </p>
      </Modal>
    </Fragment>
  );
};

export default ModalComponent;
