import React from "react";
import 'antd/dist/antd.css';
import Cards from './Card';

class ListCard extends React.Component {

  handleClick=()=>{
    this.props.callback();
  }
  render() {
    console.log(this.props.contacts);
    return (
      <div>
        {this.props.contacts.map(c =>
          <Cards key={c._id}
            idPlace={c._id}
            name={c.name_place}
            stress={c.stress}
            dictrict={c.dictrict}
            city={c.city}
            picture={c.picture}
            tel={c.phone}

            callback={this.handleClick}
          />
        )}
      </div>
    );
  }
}

export default ListCard;