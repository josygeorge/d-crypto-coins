import { Col, Row, Typography } from 'antd';
import React from 'react';
import { Line } from 'react-chartjs-2';

const { Title } = Typography;

const LineChart = ({ cryptoCoinHistory, currentPrice, cryptoCoinName }) => {
    console.log(cryptoCoinHistory);

    const cryptoCoinPrice = [];
    const cryptoCoinTimeStamp = [];
    const historyDataArrObj = cryptoCoinHistory?.data?.history;
    // Pushing price and timestamp from cryptoCoinHistory (history api) to the empty array
    for (let i = 0; i < historyDataArrObj?.length; i++) {
        cryptoCoinPrice.push(historyDataArrObj[i]?.price);
    }
    for (let i = 0; i < historyDataArrObj?.length; i++) {
        // date readable format
        let timeStampToDateFormat = new Date(historyDataArrObj[i]?.timestamp).toLocaleDateString();
        cryptoCoinTimeStamp.push(timeStampToDateFormat);
    }

    //console.log(cryptoCoinTimeStamp);

    // data object
    const cryptoCoinsData = {
        labels: cryptoCoinTimeStamp,
        datasets: [
            {
                label: 'In USD',
                data: cryptoCoinPrice,
                fill: false,
                backgroundColor: '#1f6bb6',
                borderColor: '#000000'
            }
        ]
    }
    // options object
    const cryptoCoinsOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

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
            <Line data={cryptoCoinsData} options={cryptoCoinsOptions} />
        </>


    )
}

export default LineChart;
