import React from 'react';
import 'antd/dist/antd.css';
import {Link } from 'react-router-dom';
import {Col, Card} from 'antd';
import PropTypes from "prop-types";
import { API_URL } from '../../config';

const { Meta } = Card;

export default function SuggestBlog(props)
{
  return(
    <Col style={{marginBottom: 30}}>
      <Link
        to={
            {pathname:`/detailBlogs/${props.title}`,
             state: {title: props.idBlog}}
        }
      >
        
      <Card
        hoverable
      >
        <div style={{paddingBottom: 15}}>
          <img alt="example" src={`${API_URL}` + props.avatar} width="100%" height="300px"/>
        </div>
        <Meta 
          title={
            <a style={{fontSize: 26, color:'#636363'}}>
              {props.title}
            </a>
            } 
            description={props.content} 
            style={{fontSize: 18}} 
        />
      </Card>
      </Link>
    </Col>
  );
};

SuggestBlog.propTypes = {
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  };