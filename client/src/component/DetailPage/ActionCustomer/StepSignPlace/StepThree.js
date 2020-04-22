import React from 'react';
import 'antd/dist/antd.css';
import './style.scss'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from '../../../CurentLocation/map';
import { REACT_APP_GOOGLE_KEY } from '../../../../config';
// import Marker from '../../../CurentLocation/Marker';
import {storeTemplatLng} from '../../../../action/storeTempInfo';
import {connect} from 'react-redux';

import { Row, Col } from 'antd';

class StepThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},
            center: {
                lat: 10.852154,
                lng: 106.772201
            },
            zoom: 14,
            locations: [],
            LAT : null,
            LNG : null,
        };
        this.handleMapClick = this.handleMapClick.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    }
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    //get location
    handleMapClick = (ref, map, ev) => {
        const location = ev.latLng;
        const lat = ev.latLng.lat();
        const lng = ev.latLng.lng();
        this.setState(prevState => ({
            locations: [location],
            showingInfoWindow: false,
            activeMarker: null,
            LAT : lat,
            LNG : lng,
        }));
        
        // store lat, lng
        this.props.storeTemplatLng(this.state.LAT, this.state.LNG);

        map.panTo(location);
    };
    
    render() {
        return (
            <Row className="steps-content-3">
                <p style={{ fontWeight: "bolder" }}>
                    Xác nhận vị trí trên bản đồ để mọi người có thể tìm kiếm dễ dàng hơn
                    </p>
                <Col style={{ width: '100%', minHeight: "inherit" }}>
                    {/* <CurrentLocation
                        centerAroundCurrentLocation
                        google={this.props.google}
                    >
                        <Marker onClick={this.onMarkerClick} name={this.state.selectedPlace.name} />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                            <div>
                                <h4>{this.state.selectedPlace.name}</h4>
                            </div>
                        </InfoWindow>
                    </CurrentLocation> */}
                    <Map
                        google={this.props.google}
                        className={"map"}
                        zoom={this.state.zoom}
                        initialCenter={this.state.center}
                        onClick={this.handleMapClick}
                    >
                        {this.state.locations.map((location, i) => {
                            return (
                                <Marker
                                    key={i}
                                    position={{ lat: location.lat(), lng: location.lng() }}
                                    onClick={this.onMarkerClick}
                                    name={`Vị trí của bạn có toạ độ: ${this.state.locations}`}
                                />
                            );
                        })}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                            <div>
                                <h4>{this.state.selectedPlace.name}</h4>
                            </div>
                        </InfoWindow>
                    </Map>
                </Col>
            </Row>
        );
    }
}
// AIzaSyAjGW9JSqElvLyeRBibC9VYhciXH7CUsZM
// export default StepThree;
// export default GoogleApiWrapper({
//     apiKey: REACT_APP_GOOGLE_KEY
// })(StepThree);

function mapStateToProp(state){
    return{
        
    }
}

export default connect(
                mapStateToProp, {storeTemplatLng}
            )(
            GoogleApiWrapper({
                apiKey: REACT_APP_GOOGLE_KEY
            })(StepThree));
