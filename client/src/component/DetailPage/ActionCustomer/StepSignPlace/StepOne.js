import React from 'react';
import 'antd/dist/antd.css';
import './style.scss'

import {connect} from 'react-redux';
import {storeTempData} from '../../../../action/storeTempInfo';

import {districsHCM, districsHN, typePlace} from '../../../../config';

import { Form, Row, Col, Input, Select } from 'antd';
const {TextArea } = Input;
const {Option} = Select;

class StepOneTab extends React.Component {

    constructor(){
        super();
        this.state = {
            typePlaces: typePlace,
            city: [
                {id: "default", name: "Chọn tỉnh/thành phố"},
                {id: "hcm", name: "Tp.Hồ Chí Minh"},
                {id: "hn", name: "Hà Nội"}
            ],
            district: [
                {id: "default", name: "Chọn quận/huyện"}
            ],
            
            typePlaceValue: null,
            citiesValue: null,
            districtsValue: null,
            telValue: null,
            namePlaceValue: null,
            stressPlaceValue: null,
            decripttionValue: null
        }
    };

    setDataDistrict = (value) => {
        this.setState({citiesValue: value})
        this.props.form.setFieldsValue({
            districts: undefined
        })
        // console.log(value);
        switch(value){
            case "Tp.Hồ Chí Minh":
                this.setState({
                    district : districsHCM
                });
                return;
            case "Hà Nội":
                this.setState({
                    district: districsHN
                });
                return;
            default :
                this.setState({
                    district: [
                        {id: "default", name: "Chọn quận/huyện"}
                    ]
                });
                return;
        }
    }

    getDataDistrict = (value) =>{
        this.setState({districtsValue: value});
    }

    getType = (value) =>{
        this.setState({typePlaceValue: value});
    }

    inputChange = event =>{
        this.setState({ [event.target.name] : event.target.value});
    }

    componentDidUpdate(){
        this.props.storeTempData(this.state.typePlaceValue,
                                this.state.namePlaceValue,
                                this.state.telValue,
                                this.state.stressPlaceValue,
                                this.state.districtsValue,
                                this.state.citiesValue,
                                this.state.decripttionValue);
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <Row className="steps-content">
                <p style={{fontWeight: "bolder"}}>Thông tin địa điểm</p>
                <Col span={22} offset={1}>
                <Form layout="vertical" hideRequiredMark >
                    <Row gutter={5}>
                        <Col span={5}>
                            <Form.Item label="Loại địa điểm">
                                {getFieldDecorator('type-Place', {
                                    rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                    initialValue : this.props.type
                                })(
                                <Select onChange={this.getType} >
                                    {
                                        this.state.typePlaces.map(typePlace =>(
                                            <Option key={typePlace.type} >
                                                {typePlace.type}
                                            </Option>
                                        ))
                                    }
                                </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label="Tên địa điểm">
                                {getFieldDecorator('name-Place', {
                                    rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                    initialValue : this.props.name
                                })(
                                    <Input name="namePlaceValue" onChange={this.inputChange} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={5}>
                        <Col span={15}>
                            <Form.Item label="Địa chỉ cụ thể">
                                {getFieldDecorator('address', {
                                    rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                    initialValue : this.props.stress
                                })(
                                    <Input name="stressPlaceValue" onChange={this.inputChange} />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={5}>
                        <Col span={5}>
                            <Form.Item label="Tỉnh/Thành phố">
                                {getFieldDecorator('cities', {
                                    rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                    initialValue : this.props.city == null ? this.state.city[0].name : this.props.city
                                })(
                                <Select onChange={this.setDataDistrict}>
                                    {
                                        this.state.city.map(cities =>(
                                            <Option key={cities.name} >
                                                {cities.name}
                                            </Option>
                                        ))
                                    }
                                </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Quận/Huyện">
                                {getFieldDecorator('districts', {
                                    rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                    initialValue : this.props.district == null ? this.state.district[0].name : this.props.district
                                })(
                                <Select onChange={this.getDataDistrict} >
                                    {
                                        this.state.district.map(districts =>(
                                            <Option key={districts.name} >
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
                        <Col span={5}>
                            <Form.Item label="Số điện thoại">
                                {getFieldDecorator('sdt', {
                                    rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                    initialValue: this.props.tel
                                })(
                                    <Input name="telValue" onChange={this.inputChange} />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={5}>
                        <Col span={15}>
                            <Form.Item label="Mô tả">
                                {getFieldDecorator('decripttion', {
                                    rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                    initialValue: this.props.decription
                                })(
                                    <TextArea name="decripttionValue" rows={10} onChange={this.inputChange} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                </Col>
            </Row>
        );
    }
}

function mapStateToProp(state){
    return{
        type : state.config.tempData.typePlace,
        name : state.config.tempData.namePlace,
        tel : state.config.tempData.tel,
        stress : state.config.tempData.stress,
        district : state.config.tempData.district,
        city : state.config.tempData.city,
        decription : state.config.tempData.decription
    }
}
const StepOne = Form.create()(StepOneTab);
export default connect(mapStateToProp, {storeTempData})(StepOne);