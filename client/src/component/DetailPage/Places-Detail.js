import React from 'react';
import { API_URL, HOME_URL } from '../../config';

import SlideshowGallery from '../Carousel/slideshow-gallery';
import PrivateMAp from '../CurentLocation/privateMap';

import 'antd/dist/antd.css';
import './Places-Detail.scss';

import {connect} from 'react-redux';
import { CheckLogin, logOut } from '../../action/identifyData';

import MyComment from './comment/Comment';
import { getDetailPlaces } from '../../action/getInfoPlaces';
import { getAllRate, getRateOfUser, createRate, updateRate } from '../../action/getSetRate';

import { Col, Row, Divider, BackTop, Layout, Rate, Icon, Progress, Avatar, Tag, message, Affix } from 'antd';
import { fileToObject } from 'antd/lib/upload/utils';


const { Content } = Layout;

var collection = [
    // { src: "https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1356&q=80", caption: "Caption one" },
    // { src: "https://images.unsplash.com/photo-1557389352-e721da78ad9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", caption: "Caption two" },
    // { src: "https://images.unsplash.com/photo-1553969420-fb915228af51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80", caption: "Caption three" },
    // { src: "https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", caption: "Caption four" },
    // { src: "https://images.unsplash.com/photo-1550640964-4775934de4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", caption: "Caption five" },
];
var dataMaps = [];

class DetailPlaces extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location:{},

            name_place: null,
            phone: null,
            stress: null,
            dictrict: null,
            city: null,
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
            nonRate: null,

            userFirstName: null,
            userLastName: null,
            userTel: null,
            userAvatar: "",
        }
        this.match = props.match;
    }

    reLogin = (data)=>{
        message.error(data,3);
        sessionStorage.clear();
        this.props.logOut();
    
        window.location.href= `${HOME_URL}`;
        //this.props.callback();
    }

    onChangeRate = (value) => {
        //create new rate
        if(this.state.nonRate == null){
            this.setState({ nonRate: value });
            var body={
                id_place: this.match.params.name,
                rate : value,
            }
            createRate(sessionStorage.getItem("token"), body).then((data)=>{
                if(!data.success){
                    this.reLogin(data.message);
                }
            });
        }
        //update rate
        else{
            this.setState({ nonRate: value });
            var body={
                id_place: this.match.params.name,
                rate : value,
            }
            updateRate(sessionStorage.getItem("token"), body).then((data)=>{
                //message.error(data.message, 2)
                if(!data.success){
                    this.reLogin(data.message);
                }
            })
        }
    }

    componentDidMount = () => {
        //get data place
        //console.log("aaaa");
        getDetailPlaces(this.match.params.name).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                while (dataMaps.length) {
                    dataMaps.pop();
                }
                dataMaps.push({
                    lat: data.data[0].lat,
                    lng: data.data[0].lng,
                    name: data.data[0].name_place,
                    phone: data.data[0].phone
                });

                this.setState({
                    name_place: data.data[0].name_place,
                    phone: data.data[0].phone,
                    stress: data.data[0].stress,
                    dictrict: data.data[0].dictrict,
                    city: data.data[0].city,
                    // createBy: data.data.createBy,
                    id_type_place: data.data[0].id_type_place,
                    lat: data.data[0].lat,
                    lng: data.data[0].lng,
                    decription: data.data[0].decription,
                    picture: data.data[0].picture,

                    userFirstName: data.data[0].createBy.fistname,
                    userLastName: data.data[0].createBy.lastname,
                    userTel: data.data[0].createBy.tel,
                    userAvatar: `${API_URL}` + data.data[0].createBy.picture,
                });
                while (collection.length) {
                    collection.pop();
                }
                for (let i = 0; i < this.state.picture.length; i++) {
                    collection.push({
                        src: `${API_URL}` + this.state.picture[i], caption: ""
                    })
                }

                if(data.data[0].city=="Tp.Hồ Chí Minh"){
                    this.setState({
                        location:{
                        lat: 10.852154, lng: 106.772201}
                    })
                }
                if(data.data[0].city=="Hà Nội"){
                    this.setState({
                        location:{
                        lat: 21.05661173534262, lng: 105.81982336848239}
                    })
                }
            }
        });

        //  console.log("aa" + this.props.isLogin);
        //get rate of user
        if(this.props.isLogin){
            getRateOfUser(sessionStorage.getItem("token"), this.match.params.name).then((data)=>{
                if(!data.data[0]){
                    //console.log("chưa rate");
                    // message.error(data.message);
                    this.setState({nonRate : null});
                    
                }
                else{
                    this.setState({nonRate : data.data[0].rate});
                    // console.log(data.data);
                }
            })
        }

        //get all rate
        getAllRate(this.match.params.name).then((data)=>{
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


    render() {
        //console.log("aaa"+this.state.nonRate);
        return (
            <Content style={{ padding: '20px', marginTop: 60 }}>
                {/* tạo cho đẹp */}
                <Col span={3}></Col>

                {/* khung nội dung chính */}
                <Col span={18} className="content-detail-places">
                    <Col span={15} className="places-decription">
                        <Row gutter={5}>
                            {/* name */}
                            <Col span={18}>
                                <h1 style={{ float: "left" }}>
                                    {this.state.name_place}
                                </h1>
                            </Col>

                            <Divider></Divider>
                        </Row>


                        {/* decription */}
                        <Row style={{ marginTop: 10 }}>
                            {/* pic slider */}
                            <Row>
                                {/* pics slider */}
                                <SlideshowGallery
                                    input={collection}
                                    ratio={`3:2`}
                                    mode={`automatic`}
                                    timeout={`6000`}
                                />
                                <Divider></Divider>
                            </Row>

                            <Row className="decription-full">
                                <Col>
                                    <p>
                                        <Icon type="environment" /> {this.state.stress}, {this.state.dictrict}, {this.state.city}
                                    </p>
                                    <p>
                                        <Icon type="phone" /> {this.state.phone}
                                    </p>
                                    <p>
                                        Mô tả:
                                    </p>
                                    {this.state.decription == "null" ? 
                                        <p style={{whiteSpace : "pre-wrap"}}>
                                            
                                        </p>
                                        : 
                                        <p style={{whiteSpace : "pre-wrap"}}>
                                            {this.state.decription }
                                        </p>
                                    }
                                </Col>
                            </Row>
                        </Row>

                        {/* location on map */}
                        <Row>
                            <Col style={{ backgroundColor: '#636363', height: 400 }}>
                                <PrivateMAp dataMap={dataMaps} location={this.state.location}  />
                            </Col>

                            <Divider></Divider>
                        </Row>

                        {/* rate and comment */}
                        <Row>
                            {/* rate */}
                            <div style={{ paddingBottom: 10 }}>
                                <Col>
                                    <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }} style={{ float: "left", marginRight: 20 }}
                                        percent={((this.state.onceRate+
                                            this.state.twoRate*2+
                                            this.state.threeRate*3+
                                            this.state.fourRate*4+
                                            this.state.fiveRate*5)/this.state.totalRate)/5*100}
                                        format={percent => `${percent*5/100} /5`} />

                                    <div style={{ width: 170, float: "left" }}>
                                        <Progress percent={(this.state.onceRate/this.state.totalRate)*100} strokeColor={{ '0%': '#f5e60f', '100%': '#f5e60f' }} size="small" status="normal"
                                            format={() => '1 sao'} />
                                        <Progress percent={(this.state.twoRate/this.state.totalRate)*100} strokeColor={{ '0%': '#f5e60f', '100%': '#f5e60f' }} size="small" status="normal"
                                            format={() => '2 sao'} />
                                        <Progress percent={(this.state.threeRate/this.state.totalRate)*100} strokeColor={{ '0%': '#f5e60f', '100%': '#f5e60f' }} size="small" status="normal"
                                            format={() => '3 sao'} />
                                        <Progress percent={(this.state.fourRate/this.state.totalRate)*100} strokeColor={{ '0%': '#f5e60f', '100%': '#f5e60f' }} size="small" status="normal"
                                            format={() => '4 sao'} />
                                        <Progress percent={(this.state.fiveRate/this.state.totalRate)*100} strokeColor={{ '0%': '#f5e60f', '100%': '#f5e60f' }} size="small" status="normal"
                                            format={() => '5 sao'} />
                                    </div>
                                </Col>

                                {/* rate */}
                                <Col span={6} offset={4}>
                                    <h3>Đánh giá của bạn</h3>
                                    {this.props.isLogin ?
                                    <Rate onChange={this.onChangeRate} value={this.state.nonRate} /> :
                                    <Rate disabled value={0} />
                                    }
                                </Col>

                            </div>

                            <Divider></Divider>

                            {/* comment */}
                            <div>
                                <MyComment id={this.match.params.name} />
                            </div>
                        </Row>
                    </Col>

                    {/* thông tin người đăng */}

                    <Col span={8} className="owner-decription">
                        <Affix offsetTop={80}>
                            <p style={{}}>Người đăng</p>
                            <Divider style={{ marginTop: 21 }}></Divider>
                            <Row>
                                {this.state.userAvatar !="http://localhost:3100undefined" ?
                                    <Avatar size={48} src={this.state.userAvatar} style={{ float: "left" }} />:
                                    <Avatar size={48} icon="user" style={{ float: "left" }} />
                                }
                                <span style={{ float: "left", fontWeight: "bolder", marginLeft: 15, marginTop: 5, fontSize: 20 }}>
                                    {this.state.userFirstName} {this.state.userLastName}
                                </span>
                            </Row>
                            <Divider></Divider>
                            <Row>
                                <Tag color="#87d068"><Icon type="phone" style={{ fontSize: 20 }} /> <span style={{ fontSize: 20 }}>{this.state.userTel}</span></Tag>
                            </Row>
                        </Affix>
                    </Col>

                </Col>

                {/* tạo cho đẹp */}
                <Col span={3}></Col>

                {/* back top */}
                <div>
                    <BackTop />
                </div>
            </Content>
        );
    }
}

function mapStateToProp(state){
    return{
        isLogin : state.config.checkLogin
    }
  }
  
export default connect(mapStateToProp, {CheckLogin, logOut})(DetailPlaces);

// export default DetailPlaces;