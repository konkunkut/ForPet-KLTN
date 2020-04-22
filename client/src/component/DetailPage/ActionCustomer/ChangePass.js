import React from 'react';
import 'antd/dist/antd.css';

import {getProfile} from './actionAPI';

import {Col, Row, Form, Input, Button, message, Modal} from 'antd';

class MyChangePass extends React.Component
{
    constructor(){
        super();
        this.state = {
            isEdit : false,

            loading: false,
            visible: false,
            confirmLoading : false,
        
            userToken : sessionStorage.getItem("token"),
            pass : null,
            oldPass : null,
            newPass : null
        }
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
        this.props.form.resetFields();
    };

    handleOkModel = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    confirmLoading: true,
                });
                setTimeout(() => {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                    message.success('Đổi mật khẩu thành công !', 2);
                }, 2000);
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('new-password')) {
          callback('Mật khẩu nhập lại chưa trùng khớp');
        } else {
          callback();
        }
      };
    
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confim-password'], { force: true });
        }
        callback();
    };

    handleCancelModel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
        this.props.form.resetFields();
    };

    passChange = event =>{
        this.setState({pass : event.target.value});
    };
    oldPassChange = event =>{
        this.setState({oldPass : event.target.value});
    };
    newPassChange = event =>{
        this.setState({newPass : event.target.value});
    };

    render(){
        const { visible, confirmLoading} = this.state;
        const { form :{getFieldDecorator}} = this.props;
        return(
            <div>
            <Button style={{margin:20}} onClick={this.showModal} >Đổi mật khẩu</Button>
            <Modal
                title="Đổi mật khẩu"
                visible={visible}
                onOk={this.handleOkModel}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancelModel}
                destroyOnClose={true}
            >
            <Form layout="vertical" hideRequiredMark >
                <Row gutter={5}>
                <Col>
                    <Form.Item label="Mật khẩu cũ">
                    {getFieldDecorator('old-password', {
                        rules: [
                        {
                            required: true,
                            message: 'Không bỏ trống phần này!',
                        },
                        ],
                    })(
                        <Input onChange={this.oldPassChange} />
                    )}
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={5}>
                <Col>
                    <Form.Item label="Mật khẩu mới" hasFeedback>
                    {getFieldDecorator('new-password', {
                        rules: [
                        {
                            required: true,
                            message: 'Không bỏ trống phần này!',
                        },
                        {
                            validator: this.validateToNextPassword,
                        },
                        ],
                    })(
                        <Input.Password onChange={this.newPassChange} />
                    )}
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={5}>
                <Col>
                    <Form.Item label="Nhập lại mật khẩu mới" hasFeedback>
                    {getFieldDecorator('confim-password', {
                        rules: [
                        {
                            required: true,
                            message: 'Không bỏ trống phần này!',
                        },
                        {
                            validator: this.compareToFirstPassword,
                        },
                        ],
                    })(
                        <Input.Password onBlur={this.handleConfirmBlur} onChange={this.newPassChange} />
                    )}
                    </Form.Item>
                </Col>
                </Row>
            </Form>
            
            </Modal>
            </div>
        );
    }
}

const ChangePass= Form.create()(MyChangePass);

export default ChangePass;