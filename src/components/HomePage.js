import { Col, Row, Statistic, Typography } from 'antd';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const HomePage = () => {
    return (
        <>
            <Title level={3} className='heading'>Crypto Coins - Worldwide Stats</Title>
            <Row>
                <Col span={12}>
                    <Statistic title='Total Crypto Currencies' value="5" />
                </Col>
                <Col span={12}>
                    <Statistic title='Total Exchanges' value="5" />
                </Col>
                <Col span={12}>
                    <Statistic title='Total Market Cap' value="5" />
                </Col>
                <Col span={12}>
                    <Statistic title='Total 24th Volume' value="5" />
                </Col>
                <Col span={12}>
                    <Statistic title='Total Markets' value="5" />
                </Col>
            </Row>
        </>

    )
}

export default HomePage
