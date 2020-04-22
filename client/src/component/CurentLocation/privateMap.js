import React from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';
import { REACT_APP_GOOGLE_KEY } from '../../config';

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };


class PrivateMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            //locations: this.props.location,
            locations: {
                lat: 10.852154, lng: 106.772201
            },
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        if( this.props.location != nextProps.location){
            this.setState({
                locations: nextProps.location,
            })
            //nextProps.callback();
        }
        return true;
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        //console.log(this.state.locations)
        return (
            <Map
                google={this.props.google}
                zoom={11}
                style={{width:"100%", height:"100%"}}
                center={this.state.locations}
                initialCenter={{lat: 10.852154, lng: 106.772201}}
            >
                {this.props.dataMap && this.props.dataMap.map((data,i) =>
                    <Marker
                        key={i}
                        position={{
                            lat: data.lat,
                            lng: data.lng
                        }}
                        onClick={this.onMarkerClick}
                        name={data.name +' ('+ data.phone+')'}
                    />
                )}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        {this.state.selectedPlace.name}
                    </div>
                </InfoWindow>
            </Map>
        );
    }
};

export default GoogleApiWrapper({
    apiKey: REACT_APP_GOOGLE_KEY
})(PrivateMap);