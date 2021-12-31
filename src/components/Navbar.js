import { Avatar, Button, Menu, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons';


const Navbar = () => {
    let location = useLocation();
    const [current, setCurrent] = useState(location.pathname);
    // Menu on screen size change
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);

    useEffect(() => {
        if (location) {
            if (current !== location.pathname) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    // Menu on screen size change
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize < 801) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);


    const handleMenuItemClick = (e) => {
        setCurrent(e.key);
    }

    return (
        <div className='navbar-container'>
            <div className='logo'>
                <Avatar src='/img/crypto-coin.jpeg' size="large" />
                <Typography.Title
                    level={4}
                    className='logo-link'>
                    <Link to='/'>D-Crypto-Coins</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>

            {/* Menu display on screen size change */}
            {activeMenu && (
                <Menu
                    theme='dark'
                    onClick={handleMenuItemClick}
                    defaultSelectedKeys={['/']}
                    selectedKeys={[current]}>
                    <Menu.Item icon={<HomeOutlined />} key='/'>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />} key='/cryptocoins'>
                        <Link to='/cryptocoins'>Crypto Coins</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />} key='/exchanges'>
                        <Link to='/exchanges'>Exchanges</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    )
}

export default Navbar;
