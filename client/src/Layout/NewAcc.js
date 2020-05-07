import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Modal, Button, Form, Row, Col, Input, message} from 'antd';

import {signUp} from './authAPI';

class NewAccount extends React.Component {
  state = {
    loading: false,
    visible: false,

    firstName : null,
    lastName : null,
    email : null,
    pass : null
  };

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        const body={
          fistname : this.state.firstName,
          lastname : this.state.lastName,
          email : this.state.email,
          password : this.state.pass
        };

        signUp(body).then((data) => {
          if (!data.success)
          {
            message.error(data.message, 5);
          }
          else{
            // console.log('Received values of form: ', values);
            this.setState({ loading: true });
            setTimeout(() => {
              this.setState({ loading: false});
              message.success('Tạo tài khoản thành công !', 2);
              this.props.form.resetFields();
              this.props.callback();
            }, 2500);
            //  this.props.callback();
            // message.success('This is a success message');
          }
        });
      }
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.form.resetFields();
    this.props.callback();
  };
  
  componentWillMount(){
      this.setState({visible:this.props.an});
  }

  // //for validation
  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
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

  firstNameChange = event =>{
    this.setState({firstName : event.target.value});
  }
  lastNameChange = event =>{
    this.setState({lastName : event.target.value});
  }
  emailChange = event =>{
    this.setState({email : event.target.value});
  }
  passChange = event =>{
    this.setState({pass : event.target.value});
  }

  render() {
    const { visible, loading } = this.state;
    const {form :{getFieldDecorator}} = this.props;
    return (
      <div>
        <Modal
          visible={visible}
          title="Đăng ký"
          style={{ top: 20 }}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Huỷ
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Xác nhận
            </Button>,
          ]}
        >
          <Form layout="vertical" hideRequiredMark >

            <Row gutter={5}>
              <Col span={12}>
                <Form.Item label="Họ">
                  {getFieldDecorator('ho', {
                    rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                  })(
                    <Input placeholder="VD: Nguyễn" onChange={this.firstNameChange} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tên">
                  {getFieldDecorator('ten', {
                    rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                  })(
                    <Input placeholder="VD: Văn A" onChange={this.lastNameChange} />
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
                  })(
                    <Input placeholder="VD: abc@xyz" onChange={this.emailChange} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col>
                <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator('password', {
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
                    <Input.Password placeholder="********"/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col>
                <Form.Item label="Nhập lại password" hasFeedback>
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
                    <Input.Password placeholder="" onBlur={this.handleConfirmBlur} onChange={this.passChange} />
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
const NewAcc = Form.create()(NewAccount);
export default NewAcc;
          