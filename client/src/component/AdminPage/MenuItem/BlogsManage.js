import React from 'react';
import 'antd/dist/antd.css';
import {HOME_URL} from '../../../config';
import { Row, Layout, Table, Steps, message, Button, Divider, Popconfirm } from 'antd';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';
import {getAllNews_ad, deleteNews} from './helper';

const { Content } = Layout;

class Blog_Management extends React.Component {
    constructor(props) {
        super(props);
        this.columns=[
            {
                title: 'Ngày đăng',
                dataIndex: 'date',
                width: '25%',
            },
            {
                title: 'Tiêu đề',
                dataIndex: 'title',
                width: '45%',
            },
            {
                title: 'Người đăng',
                dataIndex: 'createby',
                width: '45%',
            },
            {
                title: 'Lượt xem',
                dataIndex: 'view',
                width: '10%',
            },
            {
                title: '',
                key: 'action',
                width: '20%',
                render: (text, record) =>
                <span>
                <Link
                    to={
                        {pathname:`/detailBlogs/${record.title}`,
                        state: {title: record.key}}
                    }
                >
                    <Button type="link" >Đọc bài viết</Button>
                </Link>
                <Divider type="vertical" />
                <Popconfirm title="Xác nhận xoá?" onConfirm={() => this.handleDelete(record.key)}>
                    <Button type="link" >Xoá</Button>
                </Popconfirm>
                </span>
                ,
            },
        ]
        this.state={
            dataRows :[],
            loading: false,
        }
    }

    handleDelete=(key)=>{
        this.setState({
            loading: true
        })

        setTimeout(() => {
            deleteNews(key).then((data)=>{
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
        getAllNews_ad().then((data)=>{
            if(!data.success){
                console.log(data.message)
            }
            else{
                //console.log(data.data);
                var tempdata=[];
                for(let i=0; i < data.data.length; i++){
                    tempdata.push({
                        key: data.data[i]._id,
                        date: data.data[i].date,
                        title: data.data[i].title,
                        view: data.data[i].view,
                        createby: `${data.data[i].id_user.fistname} ${data.data[i].id_user.lastname}`
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

export default Blog_Management;