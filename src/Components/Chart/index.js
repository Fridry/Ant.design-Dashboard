import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Typography, Card, Statistic, Row, Col } from "antd";
import {
  MenuUnfoldOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  StopOutlined,
} from "@ant-design/icons";

import api from "../../services/api";

const { Title } = Typography;

const Chart = ({ query }) => {
  const [info, setInfo] = useState({});
  // Estável (hs >= 80), Em Alerta (60 <hs < 80) e Críticos (hs <= 60)

  const getData = async () => {
    const response = await api.get(`/chart${query}`);

    setInfo(response.data);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { alerta, critico, estavel, total } = info;

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Informações sobre Ativos",
    },
    subtitle: {
      text:
        "Gráfico apresentando a quantidade de ativos em cada nível de saúde",
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Quantidades",
      },
    },
    plotOptions: {
      series: {
        pointPadding: 0.3,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
      },
    },
    series: [
      {
        title: "n",
        colorByPoint: true,
        data: [
          {
            name: "Estável",
            y: estavel,
            color: "#52c41a",
          },
          {
            name: "Em Alerta",
            y: alerta,
            color: "#faad14",
          },
          {
            name: "Crítico",
            y: critico,
            color: "#ff4d4f",
          },
        ],
      },
    ],
  };

  return (
    <hs>
      <Row gutter={16} style={{ textAlign: "center" }}>
        <Col span={6}>
          <Card>
            <Statistic
              title={
                <Title level={5} style={{ color: "#1890ff" }}>
                  Ativos cadastrados
                </Title>
              }
              value={total}
              prefix={<MenuUnfoldOutlined style={{ color: "#1890ff" }} />}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title={
                <Title level={5} type="success">
                  Ativos Disponíveis
                </Title>
              }
              value={estavel}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title={
                <Title level={5} type="warning">
                  Ativos Em manutenção
                </Title>
              }
              value={alerta}
              prefix={<WarningOutlined style={{ color: "#faad14" }} />}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title={
                <Title level={5} type="danger">
                  Ativos Desativados
                </Title>
              }
              value={critico}
              prefix={<StopOutlined style={{ color: "#ff4d4f" }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Card>
    </hs>
  );
};

export default Chart;
