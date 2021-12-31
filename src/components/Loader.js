import React from 'react';
import { Skeleton } from 'antd';

const Loader = () => {
    return (
        <div className="loader">
            {/* <Spin size='large' tip={spinTip} /> */}
            <Skeleton paragraph={{ rows: 15 }} active />
        </div>
    );
}


export default Loader;