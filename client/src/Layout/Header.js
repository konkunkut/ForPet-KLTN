import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

import Account from './Account';

import 'antd/dist/antd.css'; //impotant! import trong scss

import { Layout ,Menu} from 'antd';
import logo from '../public/dog-paw-logo.png';

const { Header } = Layout;

export default function MyHeader()
{
    return(
        <Header className="header-app">
            {/* thẻ logo */}
            <div className="logo"><img className="img-responsive" src={logo} width="50" height="50"></img><h1 className='text-logo'>For Pet</h1></div>
            
            {/* menu điều hướng */}
            <Menu className="menu-app"
                theme="dark"
                mode="horizontal"
                //defaultSelectedKeys={['2']}
            >
                <Menu.Item key="1"><Link className='link-nav' to='/'>Trang chủ</Link></Menu.Item>
                <Menu.Item key="2"><Link className='link-nav' to='/places'>Cơ sở chăm sóc</Link></Menu.Item>
                <Menu.Item key="3"><Link className='link-nav' to='/news'>Chuyên mục sức khoẻ</Link></Menu.Item>
                <Menu.Item key="4"><Link className='link-nav' to='/contact'>Thông tin liên hệ</Link></Menu.Item>

                <Menu.Item className="dang-nhap" key="5" disabled>
                    <div>
                        <Account new={true}/>
                    </div>
                </Menu.Item>
            </Menu>

            {/* <div className="dang-nhap">
                <Account new={true}/>
            </div> */}
        </Header>
    );
}
