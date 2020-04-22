import React from 'react';
import 'antd/dist/antd.css';
import {HOME_URL} from '../../../config';
import { Row, Layout, Icon, Steps, message, Button, Divider, Popconfirm, Table } from 'antd';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';

import {getAllUser} from './helper';

const { Content } = Layout;

class User_Management extends React.Component {
    constructor(props) {
        super(props);
        this.columns=[
            {
                title: 'STT',
                dataIndex: 'index',
                width: '10%',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                width: '30%',
            },
            {
                title: 'Họ',
                dataIndex: 'firstname',
                width: '20%',
            },
            {
                title: 'Tên',
                dataIndex: 'lastname',
                width: '25%',
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'tel',
                width: '15%',
            },
        ];
        this.state = {
            dataRows :[],
        };
    }

    componentDidMount(){
        getAllUser().then((data)=>{
            if(!data.success){
                console.log(data.message)
            }
            else{
                //console.log(data.data);
                var tempdata=[];
                for(let i=0; i < data.data.length; i++){
                    tempdata.push({
                        key: data.data[i]._id,
                        index: i+1,
                        email: data.data[i].local.email || data.data[i].google.email,
                        firstname: data.data[i].fistname,
                        lastname: data.data[i].lastname,
                        tel:data.data[i].tel,
                    })
                };
                //console.log(tempdata);
                this.setState({
                    dataRows : tempdata
                });
            }
        })
    }

    render(){
        return(
            <Content style={{backgroundColor: '#FFFFFF',
                        minHeight: 300,}}
            >
                <Table columns={this.columns} dataSource={this.state.dataRows} />
            </Content>
        )
    }
}

export default User_Management;