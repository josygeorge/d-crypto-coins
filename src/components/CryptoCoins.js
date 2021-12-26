import { Card, Col, Input, Row } from 'antd';
import millify from 'millify';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptoCoinsQuery } from '../api/cryptoCoinsApi';
import { SearchOutlined } from '@ant-design/icons';


const CryptoCoins = (props) => {

    const { simplified } = props;

    const count = simplified ? 6 : 100; // home page restrict the count to 6; by passing the count to rtk query
    const { data: cryptoCoinsList, isFetching } = useGetCryptoCoinsQuery(count);
    const [cryptoCoins, setCryptoCoins] = useState([]);
    const [searchCryptoCoin, setSearchCryptoCoin] = useState('');
    console.log(cryptoCoins);
    useEffect(() => {
        setCryptoCoins(cryptoCoinsList?.data?.coins); // populating api all data
        const filteredSearchCryptoCoin = cryptoCoinsList?.data?.coins.filter((coin) => (
            coin.name.toLowerCase().includes(searchCryptoCoin.toLowerCase())
        ));
        setCryptoCoins(filteredSearchCryptoCoin);
    }, [cryptoCoinsList, searchCryptoCoin]);

    if (isFetching) return 'Loading...';

    return (
        <>
            {!simplified &&
                <div className='search-crypto-coins'>
                    <Input
                        prefix={<SearchOutlined style={{ fontSize: '13px', color: 'rgb(168,168,168)' }} />}
                        allowClear
                        placeholder='Search Crypto Coin by name'
                        onChange={(e) => setSearchCryptoCoin(e.target.value)} />
                </div>
            }
            <Row gutter={[22, 32]} className='crypto-coins-card-container'>
                {cryptoCoins?.map((cryptoCoin) => (
                    <Col
                        lg={6} sm={12} xs={24}
                        className='crypto-coins-card'
                        key={cryptoCoin.id}>
                        <Link to={`/cryptocoin/${cryptoCoin.id}`}>
                            <Card
                                title={`${cryptoCoin.rank}. ${cryptoCoin.name}`}
                                extra={<img alt='crypto_coins_image' className='crypto-coins-image' src={cryptoCoin.iconUrl} />}
                                hoverable>
                                <p>Price: ${millify(cryptoCoin.price)}</p>
                                <p>Market Cap: {millify(cryptoCoin.marketCap)}</p>
                                <p>Daily Change: {millify(cryptoCoin.change)}%</p>
                                <p>First Seen: {moment(cryptoCoin.firstSeen).format('Do MMM, YYYY')}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default CryptoCoins;
