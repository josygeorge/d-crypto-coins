import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import Navbar from './components/Navbar';
import './App.css';
import HomePage from './components/HomePage';
import CryptoCoins from './components/CryptoCoins';
import CryptoCoinDetails from './components/CryptoCoinDetails';
import Exchanges from './components/Exchanges';


const App = () => {
    return (
        <div className='app-container'>
            <div className='navbar menu'>
                <Navbar />
            </div>
            <div className='main-content body-section'>
                <Layout>
                    <div className='routes'>
                        <Routes>
                            <Route exact path='/' element={<HomePage />} />
                            <Route exact path='/cryptocoins' element={<CryptoCoins />} />
                            <Route exact path='/cryptocoins/:coinId' element={<CryptoCoinDetails />} />
                            <Route exact path='/exchanges' element={<Exchanges />} />
                        </Routes>
                    </div>
                </Layout>

                <div className='footer-section'>
                    <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                        <Link to="/">
                            Digital Crypto Coins
                        </Link> <br />
                        Copyright © {new Date().getFullYear()} &nbsp;
                        All Rights Reserved.
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/exchanges">Exchanges</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}
export default App;
