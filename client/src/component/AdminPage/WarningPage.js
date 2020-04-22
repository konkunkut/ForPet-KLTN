import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';

import { HOME_URL } from '../../config';

import { Col, Row, BackTop, Layout, Avatar, Tabs, message, Button } from 'antd';
const { Content } = Layout;

class WarningPage extends React.Component {
    state = {
    }
    goHome() {
        window.location.href = `${HOME_URL}`;
    }

    render() {
        //console.log("Hacker")
        return (
            <Content style={{ padding: '20px', marginTop: '60px' }}>
                <h1>Bạn không đủ quyền truy cập trang này. Vui lòng quay về trang chủ</h1>
                    <Button type="primary" ghost onClick={this.goHome} >
                    Về trang chủ
                    </Button>
            </Content>
        )
    }
}

export default WarningPage;