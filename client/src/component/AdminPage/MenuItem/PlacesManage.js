import React from 'react';
import 'antd/dist/antd.css';
import {HOME_URL} from '../../../config';
import { Row, Layout, Icon, Steps, message, Button, Divider, Popconfirm, Table } from 'antd';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';

import {getAllPlaces_ad, deletePlaces_ad} from './helper';

const { Content } = Layout;

class Places_Management extends React.Component {
    constructor(props) {
        super(props);
        this.columns=[
            {
                title: 'STT',
                dataIndex: 'index',
                width: '5%',
            },
            {
                title: 'Địa điểm',
                dataIndex: 'name_places',
                width: '20%',
            },
            {
                title: 'Loại',
                dataIndex: 'type_places',
                width: '15%',
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'add',
                width: '30%',
            },
            {
                title: 'Người đăng',
                dataIndex: 'createby',
                width: '15%',
            },
            {
                title: '',
                dataIndex: 'action',
                width: '15%',
                render: (text, record) =>
                <span>
                <Link
                    to={
                        {pathname:`/detailPlaces/${record.key}`}
                    }
                >
                    <Button type="link" >Xem chi tiết</Button>
                </Link>
                <Divider type="vertical" />
                <Popconfirm title="Xác nhận xoá?" onConfirm={() => this.handleDelete(record.key)}>
                    <Button type="link" >Xoá</Button>
                </Popconfirm>
                </span>
                ,
            }, 
        ];
        this.state = {
            dataRows :[],
            loading: false,
        };
    }

    handleDelete=(key)=>{
        this.setState({
            loading: true
        })

        setTimeout(() => {
            deletePlaces_ad(key).then((data)=>{
                if(!data.success){
                    console.log(data.message)
                }
                else{
                    message.success(data.message,2);
                    this.getData();
                    this.setState({
                        loading: false
                    })
                }
            })

        }, 500);
    }

    getData(){
        getAllPlaces_ad().then((data)=>{
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
                        name_places: data.data[i].name_place,
                        type_places: data.data[i].id_type_place,
                        add: `${data.data[i].stress}, ${data.data[i].dictrict}, ${data.data[i].city}`,
                        createby: `${data.data[i].createBy.fistname} ${data.data[i].createBy.lastname}`
                    })
                };
                //console.log(tempdata);
                this.setState({
                    dataRows : tempdata
                });
            }
        })
    }

    componentDidMount(){
        this.getData();
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

export default Places_Management;