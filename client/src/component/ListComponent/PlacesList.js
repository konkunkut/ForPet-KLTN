import React from "react";
import 'antd/dist/antd.css';
import SuggestPlaces from './SuggestPlaces';

class PlacesList extends React.Component {

  render() {
    return (
      <div>
        {this.props.contacts.map(c =>
          <SuggestPlaces key={c._id}
            idPlace={c._id}
            name={c.name_place}
            stress={c.stress}
            dictrict={c.dictrict}
            city={c.city}
            picture={c.picture[0]}
            tel={c.phone}
          />
        )}
      </div>
    );
  };
}

export default PlacesList;