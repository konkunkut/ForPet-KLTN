import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';

import { Col, Card, Divider } from 'antd';

const { Meta } = Card;

class LastestNews extends React.Component {
    render() {
        return (
            <Col span={22} offset={1}>
                <Link
                    to={
                        {
                            pathname: `/detailBlogs/${this.props.title}`,
                            state: {
                                title: this.props.idBlog,
                            }
                        }
                    }
                >

                    <Card
                        style={{ width: '100%', height: 'auto' }}
                        cover={
                            <img alt="avatar" src={`${API_URL}` + this.props.pictures[0]} width="100%" height="158px" />
                        }
                        hoverable
                    >
                        <Meta
                            title={
                                <a style={{ color: '#636363' }}>
                                    {this.props.title}
                                </a>}
                            description={this.props.content}
                        />
                    </Card>
                    <Divider></Divider>

                </Link>
            </Col>
        );
    }
}

export default LastestNews;