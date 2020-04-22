import React from 'react';
import 'antd/dist/antd.css';
import './CustommerPage.scss';
import {connect} from 'react-redux';
import {configName, validAvatar, logOut} from '../../action/identifyData';
import {HOME_URL} from '../../config';

import { getProfile } from './ActionCustomer/actionAPI';

import EditProfile from './ActionCustomer/EditProfile';
import OwnPlaces from './ActionCustomer/OwnPlaces';
import AddPlaces from './ActionCustomer/AddPlaces';
import AddBlogs from './ActionCustomer/AddBlogs';
import OwnBlogs from './ActionCustomer/OwnBlogs';

import { Col, Row, BackTop, Layout, Avatar, Tabs, message } from 'antd';

const { Content } = Layout;
const { TabPane } = Tabs;
var jwt = require('jsonwebtoken');

class CustommerPage extends React.Component {
    constructor() {
        super();
        this.state = {
            checkOwn: false,
            isAdmin : false,
            isEditor : false,
            permission: false,
            // userAvatar: null,
            userID: sessionStorage.getItem("userID")||null,
            // firstName: sessionStorage.getItem("firstName")||null,
            // lastName: sessionStorage.getItem("lastName"),
            userToken: sessionStorage.getItem("token")||null
        }
    }

    setOwn = () => {
        this.setState({ checkOwn: !this.state.checkOwn })
    }

    reLogin = (data)=>{
        message.error(data,3);
        sessionStorage.clear();
        this.props.logOut();
    
        window.location.href= `${HOME_URL}`;
        //this.props.callback();
    }

    componentDidMount() {

        getProfile(this.state.userToken).then((data) => {
            if (!data.success) {
                // message.error(, 2);
                this.reLogin(data.message);
            }
            else {
                // this.setState({ userAvatar: data.data.avatar });
            }
        });
        this.props.configName();
        this.props.validAvatar();

        var decoded = jwt.verify(sessionStorage.getItem("token"), 'Sang_oc_cho_haha');
        // if(decoded.isAdmin){
        //     this.setState({isAdmin : decoded.isAdmin});
        //     //console.log(decoded);
        // }
        // if(decoded.isEditor){
        //     this.setState({isEditor : decoded.isEditor});
        // }
        if(decoded.isAdmin||decoded.isEditor){
            console.log(decoded);
            this.setState({
                permission: true
            })
        }
    }

    render() {
        console.log(this.state.permission)
        return (
            <Content style={{ padding: '20px', marginTop: 60 }}>
                {/* tạo cho đẹp */}
                <Col span={2}></Col>

                {/* khung nội dung chính */}
                <Col span={20}>
                    <Row className="info-profile" >
                        {this.props.avatar !="http://localhost:3100undefined" ? 
                        <Avatar className="avatar-user" size={64} src={this.props.avatar} />:
                        <Avatar className="avatar-user" size={64} icon="user" />
                        }
                        <h2>{this.props.firstName} {this.props.lastName}</h2>
                    </Row>

                    <Row className="content-profile">
                        <Tabs defaultActiveKey={this.props.location.state.currentID} tabPosition="left">
                            <TabPane tab="Địa điểm của tôi" key="1">
                                <OwnPlaces />
                                    {/* <AddPlaces callback={this.setOwn} /> */}
                            </TabPane>
                            <TabPane tab="Thông tin cá nhân" key="2">
                                <EditProfile />
                            </TabPane>
                            <TabPane tab="Thêm địa điểm" key="3">
                                <AddPlaces />
                            </TabPane>
                            {/* {!this.state.isAdmin || !this.state.isEditor ? <div></div>:
                                <TabPane tab="Thêm bài viết" key="4">
                                    <AddBlogs />
                                </TabPane>
                            }
                            {!this.state.isAdmin || !this.state.isEditor ? <div></div>:
                                <TabPane tab="Các bài viết đã đăng" key="5">
                                    <OwnBlogs />
                                </TabPane>
                            } */}
                            {this.state.permission==false ? <div></div>:
                                <TabPane tab="Thêm bài viết" key="4">
                                    <AddBlogs />
                                </TabPane>
                            }
                            {this.state.permission==false ? <div></div>:
                                <TabPane tab="Các bài viết đã đăng" key="5">
                                    <OwnBlogs />
                                </TabPane>
                            }
                        </Tabs>
                    </Row>
                </Col>

                {/* tạo cho đẹp */}
                <Col span={2}></Col>

                {/* back top */}
                <div>
                    <BackTop />
                </div>
            </Content>
        );
    }
}

function mapStateToProp(state){
    return{
        lastName: state.config.fullName.lastName,
        firstName: state.config.fullName.firstName,
        avatar: state.config.valid.avatar
    }
}

export default connect(mapStateToProp, {configName, validAvatar, logOut})(CustommerPage);