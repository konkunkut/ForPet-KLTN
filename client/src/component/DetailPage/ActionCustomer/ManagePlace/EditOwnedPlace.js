import React from 'react';
import 'antd/dist/antd.css';

import { API_URL } from '../../../../config';
import UploadPics from '../../../UploadPic/UploadPic';
import ListComment from './ListComment';
import SlideshowGallery from '../../../Carousel/slideshow-gallery';
import { districsHCM, districsHN, typePlace } from '../../../../config';
import { storeIdPlace, getDetailPlaces } from '../../../../action/getInfoPlaces';
import { storeTempData, storeTempPic, storeTemplatLng } from '../../../../action/storeTempInfo';
import {getAllRate} from '../../../../action/getSetRate';
import { editPlace } from '../../../../action/uploadPlace';
import { connect } from 'react-redux';
import UpdateLocation from '../StepSignPlace/StepThree';

import { Col, Row, Divider, Layout, Form, Input, Button, message, Select, Progress, Modal } from 'antd';

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const collection = [];

class EditPlace extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            isEdit: false,
            visible: false,
            behavior: null,

            typePlaces: typePlace,
            city: [
                { id: "default", name: "Chọn tỉnh/thành phố" },
                { id: "hcm", name: "Tp.Hồ Chí Minh" },
                { id: "hn", name: "Hà Nội" }
            ],
            district: [
                { id: "default", name: "Chọn quận/huyện" }
            ],

            name_place: null,
            phone: null,
            stressvalue: null,
            dictrictvalue: null,
            cityvalue: null,
            createBy: null,
            id_type_place: null,
            lat: null,
            lng: null,
            decription: null,
            picture: [],

            onceRate: null,
            twoRate: null,
            threeRate: null,
            fourRate: null,
            fiveRate: null,
            totalRate: null,

        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOkModel = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancelModel = e => {
        // console.log(e);
        this.props.storeTemplatLng(null, null);
        this.setState({
            visible: false,
            behavior: Math.random()
        });
    };

    handleOk = (e) => {
        e.preventDefault();
        if (this.state.isEdit) {
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    let formData = new FormData();

                    formData.set("name_place", this.props.namePlace);
                    formData.set("phone", this.props.tel);
                    formData.set("stress", this.props.stress);
                    formData.set("dictrict", this.props.district);
                    formData.set("city", this.props.city);
                    formData.set("id_type_place", this.props.typePlace);
                    if (this.props.lat && this.props.lat) {
                        formData.set("lat", this.props.lat);
                        formData.set("lng", this.props.lng);
                    }
                    else {
                        formData.set("lat", this.state.lat);
                        formData.set("lng", this.state.lng);
                    }
                    formData.set("decription", this.props.decription);
                    formData.set("createBy", sessionStorage.getItem("userID"));

                    if (this.props.pics) {
                        if (this.props.pics.length > 0) {
                            for (let i = 0; i < this.props.pics.length; i++) {
                                formData.append("listPics", this.props.pics[i].originFileObj);
                            }
                        }
                    }

                    this.setState({ loading: true });
                    setTimeout(() => {
                        editPlace(this.props.idPlace, formData, sessionStorage.getItem("token"))
                            .then((data) => {
                                if (!data.success) {
                                    message.success(data.message, 2);
                                }
                                else {
                                    // console.log(data.data.picture);
                                    message.success(data.message, 2);
                                    this.props.storeTempData(null, null, null, null, null, null, null);
                                    this.props.storeTempPic(null);
                                    this.props.storeTemplatLng(null, null);
                                }
                            });

                        this.setState({ loading: false });
                    }, 2500);
                }
            });
        }
    }

    handleCancel = () => {
        this.setState({
            isEdit: false,
        });
        // this.props.callback();
        this.props.form.resetFields();
    };

    setDataDistrict = (value) => {
        this.setState({ cityvalue: value, isEdit: true })
        this.props.form.setFieldsValue({
            districts: undefined
        })
        // console.log(value);
        switch (value) {
            case "Tp.Hồ Chí Minh":
                this.setState({
                    district: districsHCM
                });
                return;
            case "Hà Nội":
                this.setState({
                    district: districsHN
                });
                return;
            default:
                this.setState({
                    district: [
                        { id: "default", name: "Chọn quận/huyện" }
                    ]
                });
                return;
        }
    }

    getDataDistrict = (value) => {
        this.setState({ dictrictvalue: value, isEdit: true });
    }

    getType = (value) => {
        this.setState({ id_type_place: value, isEdit: true });
    }

    inputChange = event => {
        this.setState({ [event.target.name]: event.target.value, isEdit: true });
    }

    prevPage = () => {
        this.setState({
            isEdit: false,
        });
        this.props.callback();
        this.props.form.resetFields();
    }

    componentDidMount() {
        //lấy thông tin chi tiết
        getDetailPlaces(this.props.idPlace).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                this.setState({
                    name_place: data.data[0].name_place,
                    phone: data.data[0].phone,
                    stressvalue: data.data[0].stress,
                    dictrictvalue: data.data[0].dictrict,
                    cityvalue: data.data[0].city,
                    // createBy: data.data.createBy,
                    id_type_place: data.data[0].id_type_place,
                    lat: data.data[0].lat,
                    lng: data.data[0].lng,
                    decription: data.data[0].decription,
                    picture: data.data[0].picture,
                });
            };
            while (collection.length) {
                collection.pop();
            }
            for (let i = 0; i < this.state.picture.length; i++) {
                collection.push({
                    src: `${API_URL}` + this.state.picture[i], caption: ""
                })
            }
        });

        //lấy đánh giá
        getAllRate(this.props.idPlace).then((data)=>{
            if(!data.success){
                message.error(data.message, 2);
            }
            else{
                if(data.data)
                if(data.data.length >0)
                // console.log("Số sao : " + data.data[0]._id.rate, data.data[0].count);
                for(let i=0; i< data.data.length; i++){
                    if(data.data[i]._id.rate == 1){
                        this.setState({onceRate : data.data[i].count,
                            totalRate : this.state.totalRate +1});
                    }
                    if(data.data[i]._id.rate == 2){
                        this.setState({twoRate : data.data[i].count,
                            totalRate : this.state.totalRate +1});
                    }
                    if(data.data[i]._id.rate == 3){
                        this.setState({threeRate : data.data[i].count,
                            totalRate : this.state.totalRate +1});
                    }
                    if(data.data[i]._id.rate == 4){
                        this.setState({fourRate : data.data[i].count,
                            totalRate : this.state.totalRate +1});
                    }
                    if(data.data[i]._id.rate == 5){
                        this.setState({fiveRate : data.data[i].count,
                            totalRate : this.state.totalRate +1});
                    }
                }
            }
        });
    }

    componentDidUpdate() {
        this.props.storeTempData(this.state.id_type_place,
            this.state.name_place,
            this.state.phone,
            this.state.stressvalue,
            this.state.dictrictvalue,
            this.state.cityvalue,
            this.state.decription
        );
    }

    render() {
        // console.log(this.state.name_place);
        const { form: { getFieldDecorator } } = this.props;
        return (
            <Content style={{ padding: 5 }}>
                <Row>
                    <Button type="link" style={{ textAlign: "right", float: "right" }} onClick={this.prevPage} >Quay lại</Button>
                </Row>
                <Row gutter={5} style={{ backgroundColor: '#FFFFFF', padding: 5 }}>
                    {/* edit info */}
                    <Col span={14} >
                        <h2 style={{ textAlign: "left" }}>Thông tin</h2>
                        <Divider style={{ marginTop: 10 }}></Divider>
                        <Form layout="vertical" hideRequiredMark >
                            <Row gutter={5}>
                                <Col span={8}>
                                    <Form.Item label="Loại địa điểm">
                                        {getFieldDecorator('id_type_place', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            initialValue: this.state.id_type_place
                                        })(
                                            <Select onChange={this.getType} >
                                                {
                                                    this.state.typePlaces.map(typePlace => (
                                                        <Option value={typePlace.type} >
                                                            {typePlace.type}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={16}>
                                    <Form.Item label="Tên địa điểm">
                                        {getFieldDecorator('name-Place', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            initialValue: this.state.name_place,
                                        })(
                                            <Input name="name_place" onChange={this.inputChange} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={24}>
                                    <Form.Item label="Địa chỉ cụ thể">
                                        {getFieldDecorator('address', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            initialValue: this.state.stressvalue,
                                        })(
                                            <Input name="stressvalue" onChange={this.inputChange} />,
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={8}>
                                    <Form.Item label="Tỉnh/Thành phố">
                                        {getFieldDecorator('cityvalue', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            initialValue: this.state.cityvalue
                                        })(
                                            <Select onChange={this.setDataDistrict}>
                                                {
                                                    this.state.city.map(cities => (
                                                        <Option value={cities.name} >
                                                            {cities.name}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Quận/Huyện">
                                        {getFieldDecorator('dictrictvalue', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            initialValue: this.state.dictrictvalue
                                        })(
                                            <Select onChange={this.getDataDistrict} >
                                                {
                                                    this.state.district.map(districts => (
                                                        <Option value={districts.name} >
                                                            {districts.name}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={8}>
                                    <Form.Item label="Số điện thoại">
                                        {getFieldDecorator('sdt', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            initialValue: this.state.phone,
                                        })(
                                            <Input name="phone" onChange={this.inputChange} />,
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={24}>
                                    <Form.Item label="Mô tả">
                                        {getFieldDecorator('decripttion', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            initialValue: this.state.decription
                                        })(
                                            <TextArea name="decription" rows={10} onChange={this.inputChange} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>

                        {/* button submit */}
                        <Row>
                            <Col span={8} offset={8} >
                                <Button type="primary" ghost loading={this.state.loading} onClick={this.handleOk} >Lưu</Button>
                                <Divider type="vertical"></Divider>
                                <Button type="danger" ghost onClick={this.handleCancel} >Huỷ</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1}></Col>

                    {/* edit pics */}
                    <Col span={9}>
                        {/* pics slider */}
                        <SlideshowGallery
                            input={collection}
                            ratio={`3:2`}
                            mode={`automatic`}
                            timeout={`3000`}
                        />
                        <Divider></Divider>

                        {/* update pics */}
                        <p>Cập nhật ảnh mới:</p>
                        <UploadPics length={"10"} isVisible={false} />

                        <Divider></Divider>
                        {/* update location */}
                        <Button type="primary" onClick={this.showModal}>
                            Chỉnh sửa vị trí
                        </Button>
                        <Modal
                            title="Cập nhật vị trí"
                            visible={this.state.visible}
                            onOk={this.handleOkModel}
                            onCancel={this.handleCancelModel}
                        >
                            <UpdateLocation key={this.state.behavior} />
                        </Modal>
                    </Col>
                </Row>

                <Row gutter={5} style={{ backgroundColor: '#FFFFFF', padding: 5 }}>
                    <Divider></Divider>
                    {/* list comment */}
                    <Col span={15}>
                        <h2 style={{ textAlign: "left" }}>Bình luận</h2>
                        <Divider style={{ marginTop: 10 }}></Divider>
                        <ListComment />
                    </Col>
                    <Col span={1}></Col>

                    {/* total rate */}
                    <Col span={8}>
                        <h2 style={{ textAlign: "left" }}>Đánh giá</h2>
                        <Divider style={{ marginTop: 10 }}></Divider>
                        {/* 5 sao */}
                        <Row>
                            {this.state.fiveRate != null ? 
                                <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                    percent={(this.state.fiveRate/this.state.totalRate)*100}
                                    format={() => `${this.state.fiveRate}/${this.state.totalRate}`}
                                /> :
                                <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                    percent={0}
                                    format={() => `0/${this.state.totalRate}`}
                                />
                            }
                            <p>5 sao</p>
                        </Row>
                        {/* 4 sao */}
                        <Row>
                            {this.state.fourRate != null ? 
                                <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                    percent={(this.state.fourRate/this.state.totalRate)*100}
                                    format={() => `${this.state.fourRate}/${this.state.totalRate}`}
                                /> :
                                <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                    percent={0}
                                    format={() => `0/${this.state.totalRate}`}
                                />
                            }
                            <p>4 sao</p>
                        </Row>
                        {/* 3 sao */}
                        <Row>
                            {this.state.threeRate != null ? 
                                <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                    percent={(this.state.threeRate/this.state.totalRate)*100}
                                    format={() => `${this.state.threeRate}/${this.state.totalRate}`}
                                /> :
                                <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                    percent={0}
                                    format={() => `0/${this.state.totalRate}`}
                                />
                            }
                            <p>3 sao</p>
                        </Row>
                        {/* 2 sao */}
                        <Row>
                            {this.state.twoRate != null ? 
                                <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                    percent={(this.state.twoRate/this.state.totalRate)*100}
                                    format={() => `${this.state.twoRate}/${this.state.totalRate}`}
                                /> :
                                <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                    percent={0}
                                    format={() => `0/${this.state.totalRate}`}
                                />
                            }
                            <p>2 sao</p>
                        </Row>
                        {/* 1 sao */}
                        <Row>
                            {this.state.onceRate != null ? 
                                <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                    percent={(this.state.onceRate/this.state.totalRate)*100}
                                    format={() => `${this.state.onceRate}/${this.state.totalRate}`}
                                /> :
                                <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                    percent={0}
                                    format={() => `0/${this.state.totalRate}`}
                                />
                            }
                            <p>1 sao</p>
                        </Row>
                    </Col>
                </Row>
            </Content>
        );
    }
}

function mapStateToProp(state) {
    return {
        idPlace: state.config.storeIdPlace.idPlace,

        typePlace: state.config.tempData.typePlace,
        namePlace: state.config.tempData.namePlace,
        tel: state.config.tempData.tel,
        stress: state.config.tempData.stress,
        district: state.config.tempData.district,
        city: state.config.tempData.city,
        decription: state.config.tempData.decription,

        pics: state.config.tempPics.pic,

        lat: state.config.templatLng.lat,
        lng: state.config.templatLng.lng,
    }
}

const EditPlaces = Form.create()(EditPlace);
export default connect(mapStateToProp, { storeIdPlace, storeTempData, storeTempPic, storeTemplatLng })(EditPlaces);
// export default EditPlaces;