import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser'; // parse the api data to HTML format
import Loader from './Loader';
import { useGetCryptoCoinExchangesQuery } from '../api/cryptoCoinsApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetCryptoCoinExchangesQuery();
    const coinExchangeData = data?.data?.exchanges;

    if (isFetching) return <Loader />;

    return (
        <>
            <Row className='coin-exchanges-panel-header'>
                <Col span={8}>Exchanges</Col>
                <Col span={6}>24h Trade Vol.</Col>
                <Col span={5}>Markets</Col>
                <Col span={5}>Change</Col>
            </Row>
            <Row className='coin-exchanges-content-container'>
                {coinExchangeData.map((exchange) => (
                    <Col span={24}>
                        <Collapse>
                            <Panel
                                key={exchange.id}
                                showArrow={false}
                                header={(
                                    <Row key={exchange.id} gutter={16}>
                                        <Col span={8}>
                                            <Text><strong>{exchange.rank}.</strong></Text>
                                            <Avatar className="coin-exchange-image" src={exchange.iconUrl} />
                                            <Text><strong>{exchange.name}</strong></Text>
                                        </Col>
                                        <Col span={6}>${millify(exchange.volume)}</Col>
                                        <Col span={5}>{millify(exchange.numberOfMarkets)}</Col>
                                        <Col span={5}>{millify(exchange.marketShare)}%</Col>
                                    </Row>
                                )}
                            >
                                {HTMLReactParser(exchange.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Exchanges;
