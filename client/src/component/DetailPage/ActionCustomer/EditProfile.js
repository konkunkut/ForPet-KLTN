import React from 'react';
import 'antd/dist/antd.css';
import './EditProfile.scss';
import {connect} from 'react-redux';
import {HOME_URL} from '../../../config';

import {getProfile, editProfile} from './actionAPI';
import {validAvatar, logOut} from '../../../action/identifyData';

import ChangePass from './ChangePass';
import UploadPics from '../../UploadPic/UploadPic';

import {Col, Row, Divider, Layout, Avatar, Form, Input, Button, message} from 'antd';

const {Content} = Layout;

class EditProfiles extends React.Component
{
    constructor(){
        super();
        this.state = {
            isEdit : false,

            loading: false,
            visible: false,
            confirmLoading : false,
        
            userToken : sessionStorage.getItem("token"),
            firstName : null,
            lastName : null,
            email : null,
            tel : "",
            userAvatar : null
        }
    }

    componentDidMount(){
        this.loadItem();
    } 

    reLogin = (data)=>{
        message.error(data,2);
        sessionStorage.clear();
        this.props.logOut();
    
        window.location.href= `${HOME_URL}`;
        //this.props.callback();
    }

    loadItem(){
        getProfile(this.state.userToken).then((data) => {
            if (!data.success) {
                // message.error(data.message, 2);
                this.reLogin(data.message);
            }
            else {
                this.setState({
                    userAvatar: data.data.avatar||"",
                    firstName: data.data.firstName||"",
                    lastName: data.data.lastName||"",
                    email: data.data.email||"",
                    tel: data.data.tel||""
                });
            }
        });
    }

    editItem(){
        const body={
            fistname : this.state.firstName,
            lastname : this.state.lastName,
            tel : this.state.tel
          };
        this.props.editProfile(body, this.state.userToken).then((data) =>{
            if(!data.success){
                // message.error(data.message, 2);
                this.reLogin(data.message);
            }
            else{
                message.success(data.message, 2);
                sessionStorage.removeItem("lastName");
                sessionStorage.removeItem("firstName");
                sessionStorage.setItem("lastName",data.data.lastName);
                sessionStorage.setItem("firstName",data.data.firstName);
            }
        })
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
    };

    handleOk = (e) => {
        // console.log(this.state.isEdit);
        e.preventDefault();
        if(this.state.isEdit){
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    // console.log('Received values of form: ', values);
                    this.setState({ loading: true });
                    setTimeout(() => {
                    this.setState({ loading: false});

                    this.editItem();

                    }, 2500);
                }
                else{
                    console.log("không lưu dc");
                }
            })
        }
    };
    
    handleCancel = () => {
        this.setState({
            isEdit : false,
        });
        this.loadItem();
        // this.props.callback();
        this.props.form.resetFields();
    };
    
    firstNameChange = event =>{
        this.setState({firstName : event.target.value, isEdit : true});
    }
    lastNameChange = event =>{
        this.setState({lastName : event.target.value, isEdit : true});
    }
    telChange = event =>{
        this.setState({tel : event.target.value, isEdit : true});
    }
    
    render(){
        const { form :{getFieldDecorator}} = this.props;
        return(
            <Content style={{backgroundColor: '#FFFFFF'}}>
                <Row>
                    {/* khung thông tin cá nhân */}
                    <Col span={14} className="edit-info" >
                        <h2 style={{textAlign:"left"}}>Hồ sơ</h2>
                        <Divider style={{marginTop: 10}}></Divider>
                        
                        <Form layout="vertical" hideRequiredMark >
                            <Row gutter={5}>
                                <Col span={12}>
                                    <Form.Item label="Họ">
                                    {getFieldDecorator('ho', {
                                        rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                        initialValue: this.state.firstName
                                    })(
                                        <Input onChange={this.firstNameChange} />
                                    )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Tên">
                                    {getFieldDecorator('ten', {
                                        rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                        initialValue: this.state.lastName
                                    })(
                                        <Input onChange={this.lastNameChange} />,
                                        
                                    )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                            <Col>
                                <Form.Item label="Email">
                                {getFieldDecorator('email', {
                                    rules: [
                                    {
                                        type: 'email',
                                        message: 'Đây không phải email.',
                                    },
                                    {
                                        required: true,
                                        message: 'Không bỏ trống phần này!',
                                    },
                                    ],
                                    initialValue: this.state.email
                                })(
                                    <Input disabled />
                                )}
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={12}>
                                    <Form.Item label="Số điện thoại">
                                    {getFieldDecorator('sdt', {
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Không bỏ trống phần này!',
                                        },
                                        ],
                                        initialValue: this.state.tel
                                    })(
                                        <Input onChange={this.telChange} />
                                    )}
                                    </Form.Item>
                                </Col>

                                {/* đổi mật khẩu */}
                                <Col span={12}>
                                    {sessionStorage.getItem("isLocal")==="isLocal" ? <ChangePass /> : <div></div>}
                                </Col>
                            </Row>
                        </Form>
                        
                    </Col>

                    {/* tạo chơi :) */}
                    <Col span={1} >
                        <Divider type="vertical" style={{}} ></Divider>
                    </Col>

                    {/* đổi ảnh đại diện */}
                    <Col span={9} className="edit-avatar" >
                        <Row>
                        {this.props.avatar !="http://localhost:3100undefined" ?
                            <Avatar shape="square" size={256} src={this.props.avatar} />:
                            <Avatar shape="square" size={256} icon="user" />
                        }
                        </Row>
                        <Divider></Divider>
                        {/* upload component */}
                        <Row>
                            <p style={{textAlign:"left"}}>Chọn ảnh đại diện mới</p>
                            <UploadPics length={"1"} isVisible={true} />
                        </Row>
                    </Col>

                </Row>

                {/* confim button */}
                <Row>
                    <Col span={4} offset={10} >
                        <Button type="primary" ghost loading={this.state.loading} onClick={this.handleOk} >Lưu</Button>
                        <Divider type="vertical"></Divider>
                        <Button type="danger" ghost onClick={this.handleCancel} >Huỷ</Button>
                    </Col>
                </Row>
            </Content>
        );
    }
}
function mapStateToProp(state){
    return{
        lastName: state.config.fullName.lastName,
        firstName: state.config.fullName.firstName,
        avatar : state.config.valid.avatar
    }
}

const EditProfile = Form.create()(EditProfiles);
export default connect(mapStateToProp, {editProfile, validAvatar, logOut})(EditProfile);