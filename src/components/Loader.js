import React from 'react';
import { Spin, Skeleton } from 'antd';

const Loader = () => {
    const spinTip = 'Please wait while Loading...';
    return (
        <div className="loader">
            {/* <Spin size='large' tip={spinTip} /> */}
            <Skeleton paragraph={{ rows: 15 }} active />
        </div>
    );
}


export default Loader;