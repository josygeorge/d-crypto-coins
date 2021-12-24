import React from 'react';
//import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
// import millify from 'millify';
// import { Col, Row, Select, Typography } from 'antd';
// import {
//     MoneyCollectOutlined,
//     DollarCircleOutlined,
//     FundOutlined,
//     ExclamationCircleOutlined,
//     StopOutlined,
//     TrophyOutlined,
//     CheckOutlined,
//     NumberOutlined,
//     ThunderboltOutlined
// } from '@ant-design/icons';

// const {Title, Text} = Typography;
// const {Option} = Select;


const CryptoCoinDetails = () => {
    const { coinId } = useParams(); // retrieving param
    return (
        <div>
            CryptoCoinDetails with id {coinId}
        </div>
    )
}

export default CryptoCoinDetails
