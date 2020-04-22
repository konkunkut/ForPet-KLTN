import React from 'react';
import 'antd/dist/antd.css';
import {HOME_URL} from '../../../config';
import { Row, Layout, Icon, Steps, message, Button } from 'antd';
import {connect} from 'react-redux';

const { Content } = Layout;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            checkSign: false
        };
    }

    render(){
        return(
            <Content style={{backgroundColor: '#FFFFFF',
                        minHeight: 300,}}
            >
                
            </Content>
        )
    }
}

export default Dashboard;