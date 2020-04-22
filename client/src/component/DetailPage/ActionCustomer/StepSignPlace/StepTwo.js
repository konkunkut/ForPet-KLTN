import React from 'react';
import 'antd/dist/antd.css';
import './style.scss'
import UploadPics from '../../../UploadPic/UploadPic';

import { Row } from 'antd';

class StepTwo extends React.Component{
    state = {

    }

    render(){
        return(
            <Row className="steps-content">
                <p style={{fontWeight: "bolder"}}>Thêm ảnh</p>
                <UploadPics length={"10"} isVisible={false}/>

            </Row>
        );
    }
}

export default StepTwo;