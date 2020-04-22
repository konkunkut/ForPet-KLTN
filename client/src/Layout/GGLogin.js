import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Modal, Button, Form, Row, Col, Input, message } from 'antd';
import {saveSessionStorage, loginGoogle} from './authAPI';
import {CheckLogin} from '../action/identifyData';

class LoginWithGoogle extends Component {
    constructor(){
        super();
        this.state={
            loading: false,
        }
    }

    onFailure = (error) => {
        console.log(error);
    };
    googleResponse = (response) => {
        // console.log(response);
        const body ={
            email: response.profileObj.email,
            fistname: response.profileObj.familyName,
            lastname: response.profileObj.givenName,
            picture: response.profileObj.imageUrl,
        }

        loginGoogle(body).then((data)=>{
            if (!data.success)
            {
              message.error(data.message, 5);
            }
            else{
                saveSessionStorage(data);
                this.props.CheckLogin();

                this.setState({ loading: true });
                setTimeout(() => {
                  this.setState({ loading: false});
                  message.success(data.message, 2);
                //   this.onClose();
                  this.props.callback();
                }, 2000);
                // this.props.callback();
            }
        })
    };

    render() {
        return (
            <div>
                    <GoogleLogin className='fadeIn fourth btnLoginSocial'
                        clientId='1088519713896-r2e0jv3nmnc0psqh7et588t3hnr2h7oo.apps.googleusercontent.com'
                        buttonText="Đăng nhập bằng Google"
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                    />
            </div>
        );
    }
}
const mapStateToProps = state => ({

});

// export default LoginWithGoogle;
export default connect(mapStateToProps,{CheckLogin })(LoginWithGoogle);
