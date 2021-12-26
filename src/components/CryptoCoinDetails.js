import React, { useState } from 'react';
//import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useGetCryptoCoinDetailsQuery } from '../api/cryptoCoinsApi';
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


const { Title, Text } = Typography;
const { Option } = Select;


const CryptoCoinDetails = () => {
    const { coinId } = useParams();     // retrieving param
    const { data: cryptoCoinDetails, isFetching } = useGetCryptoCoinDetailsQuery(coinId);
    const [timePeriod, setTimePeriod] = useState('7d');   // to render chart requires a time period

    console.log(cryptoCoinDetails?.data?.coin);

    const coinDetailsArr = cryptoCoinDetails?.data.coin;
    // Creating a custom time arr for user selection 
    const customTimeArr = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    // Creating custom statistics obj for better usability of API information
    const coinStats = [
        { title: 'Price to USD', value: `$ ${coinDetailsArr?.price && millify(coinDetailsArr?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: coinDetailsArr?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${coinDetailsArr?.volume && millify(coinDetailsArr?.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${coinDetailsArr?.marketCap && millify(coinDetailsArr?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${coinDetailsArr?.allTimeHigh?.price && millify(coinDetailsArr?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    // const coinGenericStats = [
    //     { title: 'Number Of Markets', value: coinDetailsArr?.numberOfMarkets, icon: <FundOutlined /> },
    //     { title: 'Number Of Exchanges', value: coinDetailsArr?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    //     { title: 'Approved Supply', value: coinDetailsArr?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    //     { title: 'Total Supply', value: `$ ${millify(coinDetailsArr?.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    //     { title: 'Circulating Supply', value: `$ ${millify(coinDetailsArr?.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    // ];
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
            {/* Line Chart will come here */}
            {/* Coin Stats */}
            <Col className="coin-stats-container">
                <Col className="coin-stats-value">
                    <Col className="coin-stats-value-heading">
                        <Title level={5} className="coin-details-heading">{coinDetailsArr?.name} ({coinDetailsArr?.slug}) Statistics</Title>
                        <p>An overview showing the statistics of {coinDetailsArr?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoCoinDetails;
