import React from 'react';
import 'antd/dist/antd.css';
import {Link } from 'react-router-dom';
import { API_URL } from '../../config';

import {Col, Row, Card, Divider, Icon} from 'antd';

const {Meta} = Card;

class NewBlogs extends React.Component
{
    
    render(){
    return(
        <Col span={11}  style={{marginTop: 20, marginBottom: 5, marginLeft: 22}}>
            <Link
                to={
                    {pathname:`/detailBlogs/${this.props.title}`,
                     state: {   title: this.props.idBlog
                    }}
                }
            >

            <Card
                style={{width: '100%', height:'auto'}}
                cover={[
                    <img alt="avatar" src={`${API_URL}` + this.props.pictures[0]} width="100%" height="224px" />,
                    <Row>
                        <Col span={8}>
                            <p><Icon type="calendar" />{this.props.date}</p>
                        </Col>
                        <Col span={8}>
                            <p><Icon type="eye" />{this.props.view}</p>
                        </Col>
                        <Col span={8}>
                            <p><Icon type="edit" />{this.props.blogger}</p>
                        </Col>
                    </Row>
                ]}
                hoverable
            >
                <Divider style={{marginTop:-30, marginBottom:10}}></Divider>
                <Meta
                    title= {
                        <a style={{color:'#636363', fontSize:20}}>
                            {this.props.title}
                        </a>}
                    description= {this.props.decription}
                    
                    // style={{marginTop: -20}}
                />
            </Card>

            </Link>
        </Col>
    );
                    }
}

export default NewBlogs;