import React from 'react'
import { Spin } from 'antd';

import './Spinner.scss';

function Spinner () {
    return (
        <div className="spinner-box">
            <Spin />
        </div>
    )
}

export default Spinner