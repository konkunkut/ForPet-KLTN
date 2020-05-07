import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { HOME_URL } from '../../config';

import Dashboard from './MenuItem/DashBoard';
import Places_Management from './MenuItem/PlacesManage';
import User_Management from './MenuItem/UserManage';
import Blogs_Management from './MenuItem/BlogsManage';

import { Col, Row, BackTop, Layout, Avatar, Tabs, message, Button, Menu } from 'antd';
const { Content } = Layout;

var jwt = require('jsonwebtoken');

class Admin_Dash extends React.Component {
    state = {
        isAdmin: false,
        renderKey: "dash",

    }

    handleClick = e => {
        //console.log('click ', e);
        this.setState({
            renderKey : e.key
        })
      };

    renderItem(){
        if(this.state.renderKey=="dash"){
            return(
                <Dashboard />
            )
        }
        if(this.state.renderKey=="places"){
            return(
                <Places_Management />
            )
        }
        if(this.state.renderKey=="users"){
            return(
                <User_Management />
            )
        }
        if(this.state.renderKey=="blogs"){
            return(
                <Blogs_Management />
            )
        }
    }

    componentDidMount() {
        var decoded = jwt.verify(sessionStorage.getItem("token"), 'Sang_oc_cho_haha');
        if (decoded.isAdmin) {
            this.setState({ isAdmin: decoded.isAdmin });
        }
    }

    render() {
        return (
            <Content style={{ padding: '20px', marginTop: 60 }}>
                {/* tạo cho đẹp */}
                <Col span={2}></Col>

                {/* khung nội dung chính */}
                <Col span={20}>
                    <Col span={5}>
                        <Menu
                            onClick={this.handleClick}
                            //style={{ width: 268 }}
                            defaultSelectedKeys={['dash']}
                            mode="inline"
                            theme="dark"
                        >
                            {/* dash */}
                            <Menu.Item key="dash">
                                Dashboard
                            </Menu.Item>
                            {/* place */}
                            <Menu.Item key="places">
                                Quản lý địa điểm
                            </Menu.Item>
                            {/* place */}
                                <Menu.Item key="blogs">
                                Quản lý bài viết
                            </Menu.Item>
                            {/* user */}
                            <Menu.Item key="users">
                                Quản lý tài khoản
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={18}>
                        {this.renderItem()}
                    </Col>
                </Col>

                {/* tạo cho đẹp */}
                <Col span={2}></Col>
            </Content>
        )
    }
}

export default Admin_Dash;