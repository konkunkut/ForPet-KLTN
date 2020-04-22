import React from 'react';
import 'antd/dist/antd.css';
import {Col, Button} from 'antd';

export default function SuggestButton(props)
{
    return(
        <Col    span={8} 
                style={{paddingTop: 20}}>
            <Button ghost
                    style={{fontSize: 20}}
            >
                {props.distric}
            </Button>
        </Col>
    );
}