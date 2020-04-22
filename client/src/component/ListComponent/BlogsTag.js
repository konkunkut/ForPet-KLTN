import React from 'react';
import 'antd/dist/antd.css';
import {Tag, Icon, Col } from 'antd';

export default function BlogsTag(props)
{
    return(
        <Col span={7} offset={2}>
            <Tag style={{fontSize:14, marginBottom: 10}}>
                <Icon type="double-right" />{props.tags}
            </Tag>
        </Col>
    );
}