import React from 'react';
import LoginAcc from './LoginAcc';
import ShowAcc from './ShowAcc';

export default class Account extends React.Component{
    state = {
        isnew : sessionStorage.getItem("token") || null
    }
    
    setIsNew = () =>{
        this.setState({isnew : sessionStorage.getItem("token") || null})
    }
    render(){
        if(this.state.isnew !== null){
            return <ShowAcc callback={this.setIsNew}/>
        }
        else{
            return <LoginAcc callback={this.setIsNew}/>
        }
    }
}