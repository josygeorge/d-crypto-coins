import { Col, Row, Typography } from 'antd';
import React from 'react';
import { Line } from 'react-chartjs-2';

const { Title } = Typography;

const LineChart = ({ cryptoCoinHistory, currentPrice, cryptoCoinName }) => {
    console.log(cryptoCoinHistory);
    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{cryptoCoinName} Chart Visualization</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>
                        {cryptoCoinHistory?.data?.change}
                    </Title>
                    <Title level={5} className='current-price'>
                        Current {cryptoCoinName} Price: ${currentPrice}
                    </Title>
                </Col>
            </Row>

        </>


    )
}

export default LineChart;
