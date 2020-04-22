import React from 'react';
import 'antd/dist/antd.css';
import {logIn, saveSessionStorage, loginGoogle} from './authAPI';

import {connect} from 'react-redux';
import {CheckLogin} from '../action/identifyData';

import NewAcc from './NewAcc';
import LoginWithGoogle from './GGLogin';

import { Drawer, Form, Button, Col, Row, Input, Select, Icon, message } from 'antd';

class DrawerForm extends React.Component {
  state = { 
    visible: false,
    visibleX:false,
    loading: false,

    email : null,
    password : null
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
    this.props.form.resetFields();
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
  };

  onCloseGGLogin =()=>{
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
    this.props.callback();
  }

  onSubmit = (e) => {
    // this.onClose();
    // this.props.callback();
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        const body={
          email : this.state.email,
          password : this.state.password
        };

        logIn(body).then((data) => {
          if (!data.success)
          {
            message.error(data.message, 5);
          }
          else{
            // save on session
            saveSessionStorage(data);
            this.props.CheckLogin();

            // console.log('Received values of form: ', values);
            this.setState({ loading: true });
            setTimeout(() => {
              this.setState({ loading: false});
              message.success(data.message, 2);
              this.onClose();
              this.props.callback();
            }, 2000);
            //  this.props.callback();
            // message.success('This is a success message');
          }
        });
      }
    });
  };

  onClicku = () => {
    this.setState({visibleX:true});
  }

  newState= () => {
    this.setState({visibleX:false});
  }

  renderNewAcc(){
    if(this.state.visibleX===true){
      return(<NewAcc an={this.state.visibleX} callback={this.newState}/>);
    }
  }

  inputChange = event =>{
    this.setState({ [event.target.name] : event.target.value});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {this.renderNewAcc() }
        <Button onClick={this.showDrawer}>
          <Icon type="login" /> Đăng nhập
        </Button>
        <Drawer
          title="Đăng nhập"
          // width={720}
          width={360}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={5}>
              <Col>
                <Form.Item label="Email">
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Bạn chưa nhập email' }],
                  })(
                    <Input name="email" placeholder="VD: abc@xyz" onChange={this.inputChange} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col>
                <Form.Item label="Password">
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Bạn chưa nhập password' }],
                  })(
                    <Input.Password name="password" type="password" placeholder="********" onChange={this.inputChange} />
                  )}
                </Form.Item>
              </Col>
            </Row>
           <Row gutter={5}>
             <div style={{float: "left"}}>
               <Button type="link">Quên mật khẩu?</Button>
             </div>
            <div
              style={{float : "right"}}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Huỷ
             </Button>
              <Button onClick={this.onSubmit} loading={this.state.loading} type="primary">
                Xác nhận
              </Button>
            </div>
            </Row>
          </Form>

          {/* Đăng nhập với facebook, google */}
          <div 
            style={{
              // position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              // padding: '10px 16px',
              background: '#fff',
              textAlign: 'left',
              marginTop : '80px',
              fontWeight: 'bold'
            }}
            >
              <h3>Hoặc</h3>

              <Form layout="vertical" style={{textAlign: 'center'}}>
                <Row style={{paddingTop: '10px'}}>
                  <Button type="primary" size="large" ghost >
                    <Icon type="facebook" theme="filled" />
                    Đăng nhập với Facebook
                  </Button>
                </Row>
                <Row style={{paddingTop: '10px'}}>
                  {/* <Button type="danger" size="large" ghost onClick={} >
                  <Icon type="google-square" theme="filled" />
                    Đăng nhập với Google
                  </Button> */}
                  <LoginWithGoogle callback={this.onCloseGGLogin} />
                </Row>
              </Form>
          </div>

          {/* tạo tài khoản mới */}
          <div 
            style={{
              // position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              // padding: '10px 16px',
              background: '#fff',
              textAlign: 'left',
              marginTop : '50px',
              // fontWeight: 'bold'
            }}
            >
              Nếu chưa có tài khoản

              <Form layout="vertical" style={{textAlign: 'center', paddingTop: '10px'}}>
                <Row>
                  <Button size="small" onClick={this.onClicku}>
                    <Icon type="plus" />
                    Tạo tài khoản mới
                  </Button>
            
                </Row>
              </Form>
          </div>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProp(state){
  return{

  }
}

const LoginAcc = Form.create()(DrawerForm);

export default connect(mapStateToProp, {CheckLogin})(LoginAcc);

// export default LoginAcc;