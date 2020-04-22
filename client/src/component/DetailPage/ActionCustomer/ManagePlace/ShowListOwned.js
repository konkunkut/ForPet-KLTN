import React from 'react';
import 'antd/dist/antd.css';

import ListCards from './ListCard';

import {Layout, message} from 'antd';
import {connect} from 'react-redux';
import {getAllPlaces, getUserPlaces} from '../../../../action/getInfoPlaces';
import {logOut} from '../../../../action/identifyData';
import {HOME_URL} from '../../../../config';

const {Content} = Layout;

// dự liệu test list địa điểm

class ShowPlace extends React.Component{
    constructor(){
        super();
        this.state={
            contacts: [],
        }
    }

    handleClick=()=>{
        this.props.callback();
    }

    reLogin = (data)=>{
        message.error(data,2);
        sessionStorage.clear();
        this.props.logOut();
    
        window.location.href= `${HOME_URL}`;
        //this.props.callback();
    }

    componentDidMount(){
        getUserPlaces(sessionStorage.getItem("token")).then((data)=>{
            if(!data.success){
                // message.error(data.message, 2);
                this.reLogin(data.message);
            }
            else{
                this.setState({contacts: data.data});
            }
        });
    }

    render(){
        return(
            <Content style={{backgroundColor: '#FFFFFF', padding: 5}}>
                <h2 style={{textAlign:"left"}}>Các địa điểm bạn đã đăng ký</h2>
                { this.state.contacts ? this.state.contacts.length > 0 
                    ? 
                    <ListCards contacts={this.state.contacts} callback={this.handleClick} /> 
                    :
                    <div>Bạn chưa đăng ký địa điểm nào</div> : <div>Bạn chưa đăng ký địa điểm nào</div>
                }
            </Content>
        );
    }
}
function mapStateToProp(state){
    return{
        
    }
}

// const ShowPlaces = Form.create()(ShowPlace);
export default connect(mapStateToProp, {logOut})(ShowPlace);
// export default ShowPlace;