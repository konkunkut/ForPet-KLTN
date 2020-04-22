import React from 'react';
import 'antd/dist/antd.css';

import ShowPlaces from './ManagePlace/ShowListOwned';
import EditPlaces from './ManagePlace/EditOwnedPlace';

import {Layout} from 'antd';

const {Content} = Layout;

class OwnPlaces extends React.Component
{
    constructor(){
        super();
        this.state={
            isEdit : false
        }
    }

    isEdited = () =>{
        this.setState({ isEdit : !this.state.isEdit})
    }

    render()
    {
        if(!this.state.isEdit){
            return(
                <Content style={{ backgroundColor: '#FFFFFF', minHeight: 300}}>
                    <ShowPlaces callback={this.isEdited} />
                </Content>
            );
        }
        else{
            return(
                <Content style={{ backgroundColor: '#FFFFFF', minHeight: 300}}>
                    <EditPlaces callback={this.isEdited} />
                </Content>
            );
        }
    }
}

export default OwnPlaces;