import React from 'react';
import './Marker.css';

class Marker extends React.Component {

    render() {
        return (
            <div>
                <div
                    className="pin bounce"
                    style={{ backgroundColor: this.props.color, cursor: 'pointer' }}
                    title={this.props.name}
                />
                <div className="pulse" />
            </div>
        );
    }
};

export default Marker;