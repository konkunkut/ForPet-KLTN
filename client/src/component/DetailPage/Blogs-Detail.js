import React from 'react';
import 'antd/dist/antd.css';
import './Blogs-Detail.scss';
import {API_URL} from '../../config';

import MyTags from '../ListComponent/ListTags';
import MyLstLastNews from '../NewsComponent/ListLastestNews';
import { getDetailNews, getNewestNews, updateView } from '../../action/uploadBlogs';

import {Layout, Col, BackTop, Row, Divider, Icon, message, Typography} from 'antd';

const {Content} = Layout;

const lstTags=[
    {id: 1, tags: "thú cưng" },
    {id: 2, tags: "các bệnh thường gặp" },
    {id: 3, tags: "cơ sở uy tín" },
    {id: 4, tags: "khác" }
];

class DetailBlogs extends React.Component
{
    constructor() {
        super();
        this.state = {
            newestBlogs: [],
            totalPage: null,

            title: null,
            decription: null,
            content: null,
            pics: [],
            tags: null,
            writter: null,
            date: null,
            view: null,

            hasMorePics : false,
        }
    }

    componentDidMount(){
        getNewestNews().then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                this.setState({ newestBlogs: data.data });
            }
        })

        getDetailNews(this.props.location.state.title).then((data)=>{
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                console.log(data.data[0].pictures)
                if(data.data[0].pictures.length>1){
                    this.setState({
                        hasMorePics : true
                    })
                }
                //console.log(data.data);
                this.setState({ 
                    title: data.data[0].title,
                    decription: data.data[0].decription,
                    content: data.data[0].content,
                    pics: data.data[0].pictures,
                    tags: data.data[0].tags,
                    writter: data.data[0].id_user.fistname+" "+data.data[0].id_user.lastname,
                    date: data.data[0].date,
                    view: data.data[0].view,
                });
                //updateView
                updateView(this.props.location.state.title).then((data)=>{
                    if (!data.success) {
                       // message.error(data.message, 2);
                    }
                    else {
                       //message.success(data.message, 2);
                    }
                })
            }
        })
    }

    render(){
    return(
        
        <Content style={{ padding: '20px', marginTop: 60}}>
            {/* tạo cho đẹp */}
            <Col span={2}></Col>

            {/* khung nội dung chính */}
            <Col span={20}>
                <Row>
                    {/*tin tức */}
                    <Col className="content-detail-blogs" span={17}>
                        {/* title */}
                        <Row gutter={5}>
                            <h1 style={{whiteSpace : "pre-wrap"}} >
                                {this.state.title}
                            </h1>
                        </Row>
                        {/* info */}
                        <Row gutter={5}>
                            <Icon type="edit" style={{marginLeft:20}} />{this.state.writter}
                            <Icon type="calendar" style={{marginLeft:20}} />{this.state.date}
                            <Icon type="eye" style={{marginLeft:20}} />{this.state.view}
                            <Icon type="tag" style={{marginLeft:20}} />{this.state.tags}
                        </Row>

                        <Row><span><p></p></span></Row>
                        <Row>
                            <Col span={20} offset={2}>
                                <img alt="example" src={`${API_URL}`+this.state.pics[0]} width="100%" height="auto"/>
                            </Col>
                        </Row>
                        <Row><span><p></p></span></Row>
                        {/* decription */}
                        <Row gutter={5}>
                            <h3 style={{padding:20}}>
                                <span style={{whiteSpace : "pre-wrap"}}>
                                    {this.state.decription}
                                </span>
                            </h3>
                        </Row>
                        <Divider></Divider>
                        {this.state.hasMorePics == true ?
                        <Row>
                            <Col span={20} offset={2}>
                                <img alt="example" src={`${API_URL}`+this.state.pics[1]} width="100%" height="auto"/>
                            </Col>
                        </Row>
                        : null
                        }
                        <Row><span><p></p></span></Row>
                        {/* contents */}
                        <Row gutter={5} >
                            <span style={{padding:20, whiteSpace : "pre-wrap"}}>
                                {this.state.content}
                            </span>
                        </Row>

                    </Col>

                    <Col span={1}></Col>

                    {/* gợi ý và menu */}
                    <Col className="my-menu" span={6}>
                        {/* menu */}
                        <Row className="menu-news">
                            <h3 style={{marginLeft:10, textAlign: "left"}}>Tags</h3>
                            <Divider style={{marginTop:5, marginBottom:10}}></Divider>

                            <MyTags lstTags={lstTags} />
                        </Row>

                        {/* bài viết mới */}
                        <Row className="new-blogs">
                            <h3 style={{textAlign:"left", marginLeft:10}}>Bài viết mới</h3>
                            <Divider style={{marginTop:5, marginBottom:10}}></Divider>

                            <MyLstLastNews contents={this.state.newestBlogs} />
                        </Row>

                    </Col>
                </Row>
            </Col>

            {/* tạo cho đẹp */}
            <Col span={2}></Col>
                        
            {/* back top */}
            <div>
                <BackTop />
            </div>
        </Content>
    );
    }
}
export default DetailBlogs;