import React from 'react';
import './News.scss';
import 'antd/dist/antd.css';
import MyTags from './ListComponent/ListTags';
import MyLstLastNews from './NewsComponent/ListLastestNews';
import MyNewBlogs from './NewsComponent/ListNewBlogs';
import MyNewBlogsTest from './NewsComponent/NewBlogs';

import { getTotalBlogs, getAllBlogs, getNewestNews } from '../action/uploadBlogs';

import { Layout, Col, message, BackTop, Row, Divider, Pagination, List } from 'antd';

const { Content } = Layout;

const lstTags = [
    { id: 1, tags: "thú cưng" },
    { id: 2, tags: "các bệnh thường gặp" },
    { id: 3, tags: "cơ sở uy tín" },
    { id: 4, tags: "khác" }
];

class News extends React.Component {
    constructor() {
        super();
        this.state = {
            newestBlogs: [],
            allBlogs: [],
            totalPage: null,
            curentPage: 1,
        }
    }

    changePage = (pageNumber) => {
        getAllBlogs(pageNumber).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                this.setState({ allBlogs: data.data });
            }
        })
    }

    componentDidMount() {
        getTotalBlogs().then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                //var avg = Math.ceil(data.data / 10);
                var avg = data.data
                this.setState({
                    totalPage: avg
                });
            }
        });

        getAllBlogs(this.state.curentPage).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                this.setState({ allBlogs: data.data });
            }
        })

        getNewestNews().then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                this.setState({ newestBlogs: data.data });
            }
        })
    }

    render() {
        console.log(this.state.newestBlogs);
        return (
            <Content style={{ padding: '20px', marginTop: 60 }}>
                {/* tạo cho đẹp */}
                <Col span={2}></Col>

                {/* khung nội dung chính */}
                <Col span={20}>
                    <Row>
                        {/* list tin tức */}
                        <Col className="content-news" span={17}>
                            <Row>
                                {this.state.allBlogs? this.state.allBlogs.length > 0 ?
                                    <MyNewBlogs contentsBlogs={this.state.allBlogs} />
                                :<div>Không có dữ liệu</div> : <div>Không có dữ liệu</div>
                                }
                            </Row>
                            <Row>
                                {/* phân trang */}
                                <Pagination
                                    defaultCurrent={this.state.curentPage}
                                    total={this.state.totalPage}
                                    pageSize={10}
                                    onChange={this.changePage}
                                    style={{ float: 'left' }}
                                />
                            </Row>
                        </Col>

                        <Col span={1}></Col>

                        {/* gợi ý và menu */}
                        <Col className="my-menu" span={6}>
                            {/* menu */}
                            <Row className="menu-news">
                                <h3 style={{ marginLeft: 10, textAlign: "left" }}>Tags</h3>
                                <Divider style={{ marginTop: 5, marginBottom: 10 }}></Divider>

                                <MyTags lstTags={lstTags} />
                            </Row>

                            {/* bài viết mới */}
                            <Row className="new-blogs">
                                <h3 style={{ textAlign: "left", marginLeft: 10 }}>Bài viết mới</h3>
                                <Divider style={{ marginTop: 5, marginBottom: 10 }}></Divider>
                                {this.state.newestBlogs? this.state.newestBlogs.length > 0 ?
                                    <MyLstLastNews contents={this.state.newestBlogs} />
                                :<div>Không có dữ liệu</div> : <div>Không có dữ liệu</div>
                                }
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
export default News;