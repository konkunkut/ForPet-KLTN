import React from 'react';
import 'antd/dist/antd.css';
import { HOME_URL, typeBlog } from '../../../config';

import { connect } from 'react-redux';
import UploadPics from '../../UploadPic/UploadPic';
import { storeTempPic } from '../../../action/storeTempInfo';
import { uploadBlogs } from '../../../action/uploadBlogs';

import { Row, Layout, Icon, message, Button, Form, Col, Input, Select, Divider } from 'antd';

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

class AddBlogs extends React.Component {
    state = {
        typeBlogs: typeBlog,
        typeBlogsValue: typeBlog[0].id,

        loading: false,
        isEdit: false,

        title: null,
        decription: null,
        contents: null,
    }

    getType = (value) => {
        this.setState({ typeBlogsValue: value });
    }
    inputChange = event => {
        this.setState({ [event.target.name]: event.target.value, isEdit: true });
    }

    handleOk = (e) => {
        e.preventDefault();
        if (this.state.isEdit) {
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    let formData = new FormData();
                    formData.set("title", this.state.title);
                    formData.set("decription", this.state.decription);
                    formData.set("content", this.state.contents);
                    formData.set("tags", this.state.typeBlogsValue);
                    formData.set("id_user", sessionStorage.getItem("userID"));
                    formData.set("view",0);

                    for (let i = 0; i < this.props.pics.length; i++) {
                        formData.append("listPics", this.props.pics[i].originFileObj);
                    }

                    this.setState({ loading: true });
                    setTimeout(() => {
                        uploadBlogs(formData, sessionStorage.getItem("token")).then((data) => {
                            if (!data.success) {
                                console.log(data.message);
                            }
                            else {
                                console.log(data.data);
                                message.success(data.message, 2);
                                this.props.form.resetFields();
                                this.props.storeTempPic(null);
                                this.setState({ loading: false});
                            }
                        })
                    }, 1000)
                }
                else{
                    console.log("bị chặn");
                }
            })
        }
    }

    handleCancel =(e) =>{
        e.preventDefault();
        if (this.state.isEdit) {
            this.props.storeTempPic(null);
            this.props.form.resetFields();
        }
    }

    render() {

        const { form: { getFieldDecorator } } = this.props;
        return (
            <Content style={{ backgroundColor: '#FFFFFF', minHeight: 300, padding: 5, paddingTop: 10 }}>
                <Row>
                    <Col>
                        <Form layout="vertical" hideRequiredMark >
                            <Row gutter={5}>
                                <Col span={15}>
                                    <Form.Item label="Tiêu đề">
                                        {getFieldDecorator('title', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            //initialValue: 
                                        })(
                                            <Input name="title" onChange={this.inputChange} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Loại bài viết">
                                        {getFieldDecorator('type-Blog', {
                                            rules: [{}],
                                            initialValue: this.state.typeBlogs[0].id
                                        })(
                                            <Select onChange={this.getType} >
                                                {
                                                    this.state.typeBlogs.map(typeBlog => (
                                                        <Option key={typeBlog.id} >
                                                            {typeBlog.type}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={15}>
                                    <Form.Item label="Lời mở đầu/Giới thiệu/Mô tả">
                                        {getFieldDecorator('decription', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            //initialValue: 
                                        })(
                                            <TextArea rows={4} name="decription" onChange={this.inputChange} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={15}>
                                    <p style={{ float: "left" }}>Thêm ảnh</p>
                                    <UploadPics length={"2"} isVisible={false} />
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={15}>
                                    <Form.Item label="Nội dung">
                                        {getFieldDecorator('contents', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            //initialValue: 
                                        })(
                                            <TextArea rows={15} name="contents" onChange={this.inputChange} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
                {/* confim button */}
                <Row>
                    <Col span={6} offset={1} >
                        <Button type="primary" ghost loading={this.state.loading} onClick={this.handleOk} >Thêm bài viết</Button>
                        <Divider type="vertical"></Divider>
                        <Button type="danger" ghost onClick={this.handleCancel} >Huỷ</Button>
                    </Col>
                </Row>
            </Content>
        );
    }
}

function mapStateToProp(state) {
    return {
        pics: state.config.tempPics.pic,
    }
}

const AddBlog = Form.create()(AddBlogs);
export default connect(mapStateToProp, { storeTempPic })(AddBlog);