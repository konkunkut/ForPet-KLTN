import React from 'react';
import 'antd/dist/antd.css';

import { Comment, Avatar, Form, Button, List, Input, Collapse, Result } from 'antd';
import moment from 'moment';

import { getSubCmt, getName_Pic } from '../../../action/comment';
import { API_URL } from '../../../config';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    //   header={`${comments.length} ${comments.length > 1 ? 'bình luận' : 'bình luận'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
    style={{ textAlign: "left" }}
  />
);

var cmtName, cmtPic;

class MySubComment extends React.Component {
  state = {
    comments: [],
    // comments: this.props.comments,
    submitting: false,
    value: '',
    idCMT: this.props.idCmt,
    tempList: this.props.content,
  };

  // componentDidUpdate(){
  //   var valueComments=[];
  //   for (let i = 0; i < this.state.tempList.length; i++) {
  //     this.getNameandPic(valueComments,
  //       this.state.tempList[i].id_User_subComment,
  //       this.state.tempList[i].content,
  //       this.state.tempList[i].date
  //     )
  //   }
  // }
  reLoad(){
    if(!this.state.idCMT){

    }
  }

  componentDidMount() {
    console.log(this.state.idCMT)
    var valueComments=[];
    for (let i = 0; i < this.state.tempList.length; i++) {
      this.getNameandPic(valueComments,
        this.state.tempList[i].id_User_subComment,
        this.state.tempList[i].content,
        this.state.tempList[i].date
      )
    }
  }

  getNameandPic = (valueComments,_id, content, date) => {
    console.log(valueComments);
    getName_Pic(_id).then((data) => {
      if (!data.success) {
        console.log(data.message)
      }
      else {
        cmtName = data.data.lastName;
        cmtPic = `${API_URL}` + data.data.avatar;
        valueComments.push({
          author: cmtName,
          avatar: cmtPic != "http://localhost:3100undefined" ? cmtPic : "https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg",
          content: content,
          datetime: date,
        });
        this.setState({
          comments: valueComments,
          ...this.state.comments,
        })
      }
    })
  }

  render() {
    // {this.getInfo()}
    const { comments } = this.state;
    //console.log(this.props.content);
    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
      </div>
    );
  }
}

export default MySubComment;