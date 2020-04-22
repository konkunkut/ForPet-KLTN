import React from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./UploadPic.scss";
import { API_URL } from '../../config';

import { connect } from 'react-redux';
import { storeTempPic } from '../../action/storeTempInfo';
import { updateAvatar, validAvatar } from '../../action/uploadPlace';

import { Upload, Button, Icon, Modal, message } from "antd";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: this.props.filePics || [],
    isLoading: false
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleUpload = ({ fileList }) => {
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj
    // console.log("fileList", fileList);

    // you store them in state, so that you can make a http req with them later
    // console.log(fileList);
    this.props.storeTempPic(fileList);
    this.setState({ fileList });
  };

  handleSubmit = event => {
    event.preventDefault();

    let formData = new FormData();
    // add one or more of your files in FormData
    // again, the original file is located at the `originFileObj` key
    formData.append("name", this.state.fileList[0].originFileObj);

    updateAvatar(formData, sessionStorage.getItem("token"))
      .then((data) => {
        if (!data.success) {
          message.error(data.message, 2);
        }
        else {
          message.success(data.message, 2);
          console.log(data.data.avatar);

          this.props.validAvatar(sessionStorage.getItem("token"))
          .then((data) => {
            if (!data.success) {
              message.error(data.message, 2);
            }
            else {
              // message.success(data.message, 2);
              // console.log(data.data.avatar);
              sessionStorage.removeItem("userAvatar");
              const filePath = `${API_URL}` + data.data.avatar;
              sessionStorage.setItem("userAvatar", filePath);

              this.props.storeTempPic(null);
            }
          })

        }
      })

    this.setState({ fileList: [] });
  };

  render() {
    const { previewVisible, previewImage, fileList, isLoading } = this.state;
    const test = this.props.filePics;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Tải lên</div>
      </div>
    );
    return (
      <div className="upload-pic">
        {this.props.isVisible ?
          <div>
            <Button className="btn-cfmUpload"
              onClick={this.handleSubmit}
            // this button click will trigger the manual upload
            >
              Xác nhận
          </Button>
          </div> : <div></div>
        }
        <Upload
          className="btn-upload"
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleUpload}
          onPreview={this.handlePreview}
          beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
        >
          {fileList.length >= this.props.length ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    filePics: state.config.tempPics.pic,
  }
}
// const PicturesWalls = Form.create()(PicturesWall);
export default connect(mapStateToProp, { storeTempPic, validAvatar })(PicturesWall);

// export default PicturesWall
