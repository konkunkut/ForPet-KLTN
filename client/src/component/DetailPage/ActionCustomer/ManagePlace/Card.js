import React from 'react';
import 'antd/dist/antd.css';
import { API_URL } from '../../../../config'
import { Card, Col, Rate, Row, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import { connect } from 'react-redux';
import { storeIdPlace } from '../../../../action/getInfoPlaces';
import { getAllRate } from '../../../../action/getSetRate';

class CardPlace extends React.Component {

    constructor() {
        super();
        this.state = {
            defaultRate: null,

            isLoading: true,
        }
    }

    handleClick = () => {
        this.props.storeIdPlace(this.props.idPlace);
        this.props.callback();
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
                    else {

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
        // console.log(this.props.idPlace);
        return (
            <Row style={{ marginBottom: 10, margin: 20 }}>
                <Card className="card-places"
                    size="small"
                    title={this.props.name}
                    actions={[
                        <Link
                            to={{
                                pathname: `/detailPlaces/${this.props.idPlace}`,
                                state: {
                                }
                            }}
                        >
                            <span><Icon type="ellipsis" key="ellipsis" />Xem</span>
                        </Link>,
                        <span onClick={this.handleClick}><Icon type="edit" key="edit" />Chỉnh sửa</span>,
                        <span><Icon type="delete" key />Xoá</span>,
                    ]}
                    style={{ textAlign: "left" }}
                >
                    <Col span={4}>
                        <img src={`${API_URL}` + this.props.picture[0]} style={{ maxWidth: 70, width: '100%', height: 'auto' }} />
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
            </Row >
        );
    }
}

CardPlace.propTypes = {
    name: PropTypes.string.isRequired
};

function mapStateToProp(state) {
    return {

    }
}

export default connect(mapStateToProp, { storeIdPlace })(CardPlace);