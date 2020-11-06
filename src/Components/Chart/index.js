import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Typography, Card, Statistic, Row, Col } from "antd";
import {
  MenuUnfoldOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Chart = () => {
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
            name: "Disponíveis",
            y: 230,
          },
          {
            name: "Em manutenção",
            y: 25,
          },
          {
            name: "Desativados",
            y: 33,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Row gutter={16} style={{ textAlign: "center" }}>
        <Col span={6}>
          <Card>
            <Statistic
              title={
                <Title level={5} style={{ color: "#1890ff" }}>
                  Ativos cadastrados
                </Title>
              }
              value={112893}
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
              value={112893}
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
              value={112893}
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
              value={112893}
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
    </>
  );
};

export default Chart;
