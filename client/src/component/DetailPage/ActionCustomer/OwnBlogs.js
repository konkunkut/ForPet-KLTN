import React from 'react';
import 'antd/dist/antd.css';
import {Link } from 'react-router-dom';

import {getUserBlogs} from '../../../action/uploadBlogs';

import {Layout, Table, Button} from 'antd';

const {Content} = Layout;

class OwnBlogs extends React.Component
{
    constructor(){
        super();
        this.columns=[
            {
                title: 'Ngày đăng',
                dataIndex: 'date',
                width: '25%',
            },
            {
                title: 'Tiêu đề',
                dataIndex: 'title',
                width: '55%',
            },
            {
                title: 'Lượt xem',
                dataIndex: 'view',
                width: '10%',
            },
            {
                title: '',
                key: 'action',
                width: '10%',
                render: (text, record) =>
                <Link
                    to={
                        {pathname:`/detailBlogs/${record.title}`,
                        state: {title: record.key}}
                    }
                >
                    <Button type="link" >Đọc bài viết</Button>
                </Link>
                ,
            },
        ]
        this.state={
            dataRows :[],
        }
    }

    gotoPage=(key)=>{

    }

    componentDidMount(){
        getUserBlogs(sessionStorage.getItem("token")).then((data)=>{
            if(!data.success){
                console.log(data.message)
            }
            else{
                console.log(data.data);
                var tempdata=[];
                for(let i=0; i < data.data.length; i++){
                    tempdata.push({
                        key: data.data[i]._id,
                        date: data.data[i].date,
                        title: data.data[i].title,
                        view: data.data[i].view,
                    })
                };
                console.log(tempdata);
                this.setState({
                    dataRows : tempdata
                });
            }
        })
    }

    render(){
        return(
            <Content style={{ backgroundColor: '#FFFFFF', minHeight: 300, padding: 5, paddingTop: 10 }}>
                <Table columns={this.columns} dataSource={this.state.dataRows} />
            </Content>
        )
    }
}

export default OwnBlogs;