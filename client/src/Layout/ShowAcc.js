import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

import {HOME_URL} from '../config';
import {connect} from 'react-redux';
import {configName, logOut } from '../action/identifyData';

import { Menu, Dropdown, Icon } from 'antd';

var jwt = require('jsonwebtoken');

class ShowAcc extends React.Component {

  state = {
    // name : sessionStorage.getItem("lastName")
    isAdmin: false,
  }
  componentDidMount(){
    this.props.configName();

    var decoded = jwt.verify(sessionStorage.getItem("token"), 'Sang_oc_cho_haha');
    if(decoded.isAdmin){
        this.setState({isAdmin : decoded.isAdmin});
        //console.log(decoded);
    }
  }

  onLogout = () => {
    sessionStorage.clear();
    this.props.logOut();

    window.location.href= `${HOME_URL}`;
    this.props.callback();
  };

  render() {
    //console.log(this.state.isAdmin);
    return (
      <Dropdown overlay={
        <Menu>
          <Menu.Item key="0">
            <Link to={{
              pathname: `/profile/${sessionStorage.getItem("userID")}`,
              state: { currentID: "2" }
            }}
            >Tài khoản</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to={{
              pathname: `/profile/${sessionStorage.getItem("userID")}`,
              state: { currentID: "1" }
            }}>Địa điểm của tôi</Link>
          </Menu.Item>
          {
            this.state.isAdmin==true ? 
            <Menu.Item key="1">
              <Link to={{
                pathname: `/admin/id642597?=fophabflj`,
                state: { currentID: "3" }
              }}><strong>Đến trang quản lý</strong></Link>
            </Menu.Item>
            :null
          }
          <Menu.Divider />
          <Menu.Item key="4" onClick={this.onLogout}>Đăng xuất</Menu.Item>
        </Menu>
      }
        trigger={['click']}
      >
        <a className="ant-dropdown-link" href="#">
          Chào {this.props.lastName} <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
};

function mapStateToProp(state){
  return{
      lastName: state.config.fullName.lastName,
      firstName: state.config.fullName.firstName
  }
}

export default connect(mapStateToProp, {configName, logOut})(ShowAcc);