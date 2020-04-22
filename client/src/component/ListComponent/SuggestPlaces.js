import React from 'react';
import 'antd/dist/antd.css';
import { Card, Col, Rate, Row, Icon, message } from 'antd';
import { Link } from 'react-router-dom';

import { getAllRate } from '../../action/getSetRate';
import './SuggestPlaces.scss';
import PropTypes from "prop-types";
import { API_URL } from '../../config';



class SuggestPlaces extends React.Component {
    constructor() {
        super();
        this.state = {

            defaultRate: null,

            isLoading: true,
        }
    }
    componentDidMount() {
        //get all rate
        getAllRate(this.props.idPlace).then((data) => {
            if (!data.success) {
                // message.error(data.message, 2);
            }
            else {
                if (data.data)
                    if (data.data.length > 0) {
                        // console.log("Số sao : " + data.data[0]._id.rate, data.data[0].count);
                        var once = 0, two = 0, three = 0, four = 0, five = 0, total = 0;
                        for (let i = 0; i < data.data.length; i++) {
                            if (data.data[i]._id.rate == 1) {
                                // this.setState({
                                once = data.data[i].count
                                // totalRate: this.state.totalRate + 1,
                                // });
                            }
                            if (data.data[i]._id.rate == 2) {
                                two = data.data[i].count
                            }
                            if (data.data[i]._id.rate == 3) {
                                three = data.data[i].count
                            }
                            if (data.data[i]._id.rate == 4) {
                                four = data.data[i].count
                            }
                            if (data.data[i]._id.rate == 5) {
                                five = data.data[i].count
                            }
                        }

                        this.setState({
                            isLoading: false,
                            defaultRate: (once +
                                two * 2 +
                                three * 3 +
                                four * 4 +
                                five * 5) / (once + two + three + four + five),

                        });
                    }
                    else{
                        
                        this.setState({
                            isLoading: false,
                            defaultRate: 0,

                        });
                    }
            }
            // console.log(this.state);
        });
    }
    
    render() {
        return (
            <Row style={{ marginBottom: 10 }}>
                <Link
                    to={{
                        pathname: `/detailPlaces/${this.props.idPlace}`
                    }}
                >

                    <Card className="card-places" hoverable size="small" title={this.props.name}>
                        <Col span={4}>
                            <img src={`${API_URL}` + this.props.picture} style={{ maxWidth: 70, width: '100%', height: 'auto' }} />
                        </Col>
                        <Col span={12}>
                            <p>
                                <Icon type="environment" /> Địa chỉ: {this.props.stress}, {this.props.dictrict}, {this.props.city}
                            </p>
                            <p>
                                <Icon type="phone" /> Liên hệ: {this.props.tel}
                            </p>
                        </Col>
                        <Col span={8}>
                            <div style={{ textAlign: "center" }}>
                                <p>
                                    Đánh giá
                        </p>
                                {this.state.isLoading ? <div></div> :
                                    <Rate disabled allowHalf defaultValue={this.state.defaultRate} />}
                            </div>
                        </Col>
                    </Card>

                </Link>
            </Row>
        );

    }
}


SuggestPlaces.propTypes = {
    name: PropTypes.string.isRequired
};

export default SuggestPlaces;