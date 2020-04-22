import React from 'react';
import './Place.scss';
import 'antd/dist/antd.css';
import { Layout, Col, BackTop, Pagination, Row, Divider, Form, Select, Button, message } from 'antd';

import MyCarousel from './Carousel/Carousel';
import MySuggestList from './ListComponent/PlacesList';
import PrivateMAp from './CurentLocation/privateMap';

import { getAllPlaces, getPlaceTotal } from '../action/getInfoPlaces';
import {districsHCM, districsHN, typePlace} from '../config';

const { Content } = Layout;
const { Option } = Select;
var dataMaps = [];
var body = {};
var tempLocation={};

class Places extends React.Component {
    constructor() {
        super();
        this.state = {
            contacts: [],
            location : {
                lat: 10.852154, lng: 106.772201
            },

            typePlaces: typePlace,
            city: [
                {id: "default", name: "Chọn tỉnh/thành phố"},
                {id: "hcm", name: "Tp.Hồ Chí Minh"},
                {id: "hn", name: "Hà Nội"}
            ],
            district: [
                {id: "default", name: "Chọn quận/huyện"}
            ],

            typePlaceValue: "default",
            citiesValue: "default",
            districtsValue: "default",
            curentPage: 1,
            totalPage: null,

            searchValue: {},
        }
    }

    setDataDistrict = (value) => {
        if(value=="Chọn tỉnh/thành phố"){
            this.setState({citiesValue: "default",})
            body.city ="default";
            tempLocation={
                lat: 10.852154, lng: 106.772201
            }
        }
        else{
            if(value=="Tp.Hồ Chí Minh"){
                this.setState({citiesValue: value,})
                body.city =value;
                tempLocation={
                    lat: 10.852154, lng: 106.772201
                }
            }
            if(value=="Hà Nội"){
                body.city =value;
                this.setState({citiesValue: value,})
                body.city =value;
                tempLocation={
                    lat: 21.05661173534262, lng: 105.81982336848239
                }
            }
        }
        //console.log(value)
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
        if(value=="Chọn quận/huyện"){
            this.setState({districtsValue: "default"});
            body.dictrict ="default";
        }
        else{
            this.setState({districtsValue: value});
            body.dictrict =value;
        }
    }

    getType = (value) =>{
        if(value=="Tất cả địa điểm"){
            this.setState({typePlaceValue: "default"});
            body.id_type_place ="default";
        }
        else{
            this.setState({typePlaceValue: value});
            body.id_type_place =value;
        }
    }

    onSearch=()=>{
        //console.log("đã gọi callback")
        getAllPlaces(1, body).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                dataMaps = [];
                for(let i=0; i< data.data.length; i++)
                {
                    dataMaps.push({
                        lat : data.data[i].lat, 
                        lng : data.data[i].lng, 
                        name : data.data[i].name_place, 
                        phone : data.data[i].phone
                    });
                }
                this.setState({
                    contacts: data.data,
                    location : tempLocation
                });
            }
        });
    }

    changePage = (pageNumber) =>{
        getAllPlaces(pageNumber, body).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                dataMaps = [];
                for(let i=0; i< data.data.length; i++)
                {
                    dataMaps.push({
                        lat : data.data[i].lat, 
                        lng : data.data[i].lng, 
                        name : data.data[i].name_place, 
                        phone : data.data[i].phone
                    });
                }
                this.setState({ contacts: data.data });
            }
        })
    }

    componentDidMount() {
        body.id_type_place = this.state.typePlaceValue;
        body.city = this.state.citiesValue;
        body.dictrict = this.state.districtsValue;

        getAllPlaces(this.state.curentPage, body).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                dataMaps = [];
                for(let i=0; i< data.data.length; i++)
                {
                    dataMaps.push({
                        lat : data.data[i].lat, 
                        lng : data.data[i].lng, 
                        name : data.data[i].name_place, 
                        phone : data.data[i].phone
                    });
                }
                this.setState({ contacts: data.data });
            }
        })
        getPlaceTotal().then((data)=>{
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                //console.log(data.data)
                //var avg = Math.ceil(data.data / 10);
                var avg = data.data
                this.setState({
                    totalPage : avg
                });
                //console.log(this.state.totalPage);
            }
        })
    };

    render() {
        //console.log(this.state.location)
        const { getFieldDecorator } = this.props.form;
        return (
            <Content style={{ padding: '20px', marginTop: 60 }}>
                {/* tạo cho đẹp */}
                <Col span={2}></Col>

                {/* khung nội dung chính */}
                <Col span={20}>
                    <div className="content-places">
                        {/* carousel */}
                        <MyCarousel />

                        <Row className="search-content">
                            {/* nội dung search */}
                            <Col className="detail-search" span={12}>
                                <Divider>Chọn khu vực bạn muốn tìm</Divider>
                                <Form>
                                    <Row gutter={5}>
                                        <Col span={8}>
                                            <Form.Item label="Loại địa điểm">
                                                {getFieldDecorator('type-Place', {
                                                    rules: [{}],
                                                    initialValue : this.state.typePlaces[0].type
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
                                        <Col span={8}>
                                            <Form.Item label="Tỉnh/Thành phố">
                                                {getFieldDecorator('cities', {
                                                    rules: [{}],
                                                    initialValue : this.state.city[0].name
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
                                        <Col span={8}>
                                            <Form.Item label="Quận/Huyện">
                                                {getFieldDecorator('districts', {
                                                    rules: [{ }],
                                                    initialValue : this.state.district[0].name
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
                                </Form>
                                <Button className="submit-button" onClick={this.onSearch}>Tìm kiếm</Button>
                                <Divider></Divider>

                                <div>
                                    {this.state.contacts ? this.state.contacts.length > 0 ? <MySuggestList contacts={this.state.contacts} /> :
                                        <div>Không có dữ liệu</div> : <div>Không có dữ liệu</div>
                                    }
                                    {/* phân trang */}
                                    <Pagination
                                        defaultCurrent={this.state.curentPage}
                                        total={this.state.totalPage}
                                        pageSize={10}
                                        onChange={this.changePage}
                                        style={{ float: 'left' }}
                                    />
                                </div>
                            </Col>

                            {/* bản đồ */}
                            <Col className="suggest-and-ad" span={11} style={{height:400}}>
                                <PrivateMAp  dataMap={dataMaps} location={this.state.location} />
                            </Col>
                        </Row>
                    </div>
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

const Place = Form.create()(Places);

export default Place;