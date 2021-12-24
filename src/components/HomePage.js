import { Col, Row, Statistic, Typography } from 'antd';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptoCoinsQuery } from '../api/cryptoCoinsApi'; // custom hook by redux toolkit
import CryptoCoins from './CryptoCoins';

const { Title } = Typography;

const HomePage = () => {

    // call redux toolkit query hook
    const { data, isFetching } = useGetCryptoCoinsQuery(6);
    const worldWideStats = data?.data?.stats;
    console.log(worldWideStats);

    if (isFetching) return 'Loading...';

    return (
        <>
            <Title level={3} className='home-heading'>Crypto Coins - Worldwide Stats</Title>
            <Row>
                <Col span={12}>
                    <Statistic title='Total Crypto Currencies' value={worldWideStats.total} />
                </Col>
                <Col span={12}>
                    <Statistic title='Total Exchanges' value={millify(worldWideStats.totalExchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title='Total Market Cap' value={millify(worldWideStats.totalMarketCap)} />
                </Col>
                <Col span={12}>
                    <Statistic title='Total 24th Volume' value={millify(worldWideStats.total24hVolume)} />
                </Col>
                <Col span={12}>
                    <Statistic title='Total Markets' value={millify(worldWideStats.totalMarkets)} />
                </Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={4} className='home-title'>Top 6 Crypto Coins in the world</Title>
                <Title level={5} className='show-more'>
                    <Link to='/cryptocoins'>Show More</Link>
                </Title>
            </div>
            <CryptoCoins simplified />
        </>

    )
}

export default HomePage
