import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useGetCryptoCoinDetailsQuery, useGetCryptoCoinHistoryQuery } from '../api/cryptoCoinsApi';
import millify from 'millify';
import { Col, Row, Select, Typography } from 'antd';
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';
import Chart from './Chart';


const { Title, Text } = Typography;
const { Option } = Select;


const CryptoCoinDetails = () => {
    const { coinId } = useParams();     // retrieving param
    const [timePeriod, setTimePeriod] = useState('7d');   // to render chart requires a time period
    const { data: cryptoCoinDetails, isFetching } = useGetCryptoCoinDetailsQuery(coinId);
    const { data: cryptoCoinHistory } = useGetCryptoCoinHistoryQuery({ coinId, timePeriod });

    //console.log(cryptoCoinDetails?.data?.coin);

    const coinDetailsArr = cryptoCoinDetails?.data.coin;

    // creating an arr for links, to push a custom unique identifier/slug
    const linksArrWithCustomSlug = [];

    for (let i = 0; i < coinDetailsArr?.links?.length; i++) {
        linksArrWithCustomSlug[i] = { ...coinDetailsArr?.links[i], customSlug: `${coinDetailsArr?.links[i]?.name}-${i + 1}-link` }
    }


    // Creating a custom time arr for user selection 
    const customTimeArr = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    // Creating custom statistics obj for better usability of API information
    const coinPrimaryStats = [
        { title: 'Price to USD', value: `$ ${coinDetailsArr?.price && millify(coinDetailsArr?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: coinDetailsArr?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${coinDetailsArr?.volume && millify(coinDetailsArr?.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${coinDetailsArr?.marketCap && millify(coinDetailsArr?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${coinDetailsArr?.allTimeHigh?.price && millify(coinDetailsArr?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const coinGenericStats = [
        { title: 'Number Of Markets', value: coinDetailsArr?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: coinDetailsArr?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Approved Supply', value: coinDetailsArr?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${coinDetailsArr?.totalSupply && millify(coinDetailsArr?.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${coinDetailsArr?.circulatingSupply && millify(coinDetailsArr?.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];

    if (isFetching) return 'Loading...';

    return (
        <Col className='crypto-coin-details-container'>
            <Col className='crypto-coin-heading-container'>
                <Title level={4} className='crypto-coin-name'>
                    {coinDetailsArr?.name} ({coinDetailsArr?.slug})
                </Title>
                <p>{coinDetailsArr?.name} live price in USD. View value statistics, market cap and supply.</p>
            </Col>
            <Select
                className='time-period'
                defaultValue={timePeriod}
                placeholder='Time Period'
                onChange={(value) => setTimePeriod(value)}
            >
                {customTimeArr.map((time) => <Option key={time}>{time}</Option>)}
            </Select>

            {/* Chart */}
            {/* <Chart
                cryptoCoinHistory={cryptoCoinHistory}
                currentPrice={millify(coinDetailsArr.price)}
                cryptoCoinName={coinDetailsArr.name} /> */}

            {/* Coin Statistics Container */}
            <Col className="coin-stats-container">
                <Row gutter={32}>
                    {/* Coin specific / primary Stats */}
                    <Col lg={12} sm={24} xs={24} className="coin-primary-stats">
                        <Col className="coin-value-stats-heading">
                            <Title level={5} className="coin-details-heading">{coinDetailsArr?.name} specific statistics</Title>
                            <p>An overview showing the statistics of {coinDetailsArr?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </Col>
                        {
                            coinPrimaryStats.map(({ title, value, icon }) => (
                                <Col key={title} className="coin-stats">
                                    <Col className="coin-stats-name">
                                        <Text className='icon'>{icon}</Text>
                                        <Text>{title}</Text>
                                    </Col>
                                    <Text className="stats">{value}</Text>
                                </Col>
                            ))
                        }
                    </Col>
                    {/* Coin generic Stats */}
                    <Col lg={12} sm={24} xs={24} className="coin-generic-stats">
                        <Col className="coin-value-stats-heading">
                            <Title level={5} className="coin-details-heading">Generic Statistics - All Crypto Coins</Title>
                            <p>A generic statistics of all crypto coins; info on the number of markets and exchanges, total and circulating supply.</p>
                        </Col>
                        {
                            coinGenericStats.map(({ title, value, icon }) => (
                                <Col key={title} className="coin-stats">
                                    <Col className="coin-stats-name">
                                        <Text className='icon'>{icon}</Text>
                                        <Text>{title}</Text>
                                    </Col>
                                    <Text className="stats">{value}</Text>
                                </Col>
                            ))
                        }
                    </Col>
                </Row>
            </Col>
            {/* Coin Description */}
            <Col className="coin-desc-link">
                <Row gutter={32}>
                    <Col lg={12} sm={12} xs={24} className="coin-desc">
                        <Title level={3} className="coin-details-heading">What is {coinDetailsArr?.name}?</Title>
                        {coinDetailsArr?.description && HTMLReactParser(coinDetailsArr?.description)}
                    </Col>

                    <Col lg={12} sm={12} xs={24} className="coin-links">
                        <Title level={3} className="coin-details-heading">{coinDetailsArr?.name} Links</Title>
                        {linksArrWithCustomSlug.map((link) => (
                            <Row className="coin-link" key={link.customSlug}>
                                <Title level={5} className="link-name">{link.type}</Title>
                                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                            </Row>
                        ))}
                    </Col>
                </Row>
            </Col>
        </Col>
    )
}

export default CryptoCoinDetails;
