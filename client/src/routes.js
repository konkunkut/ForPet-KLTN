import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {HOME_URL} from './config';
import {connect} from 'react-redux';

import Home from './component/Home';
import Place from './component/Place';
import News from './component/News';
import Contact from './component/Contact';

import PlacesDetail from './component/DetailPage/Places-Detail';
import BlogsDetail from './component/DetailPage/Blogs-Detail';
import CusProfile from './component/DetailPage/CustommerPage';

import AdminDashboard from './component/AdminPage/Admin_Dashboard';
import WarningPage from'./component/AdminPage/WarningPage';

var jwt = require('jsonwebtoken');

class Routing extends React.Component{
    state={
        isAdmin: false,
    }
    shouldComponentUpdate(nextProps, nextState){
        if( this.props.isLogin != nextProps.isLogin){
            var decoded = jwt.verify(sessionStorage.getItem("token"), 'Sang_oc_cho_haha');
            this.setState({isAdmin : decoded.isAdmin})
        }
        return true;
    }
    componentDidMount(){
        if(this.props.isLogin){
            var decoded = jwt.verify(sessionStorage.getItem("token"), 'Sang_oc_cho_haha');
            this.setState({isAdmin : decoded.isAdmin})
        }
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={Home} label="Trang chủ" />
                    <Route path="/places" component={Place} />
                    <Route path="/news" component={News} />
                    <Route path="/contact" component={Contact} />
                    
                    <Route path="/detailPlaces/:name" component={PlacesDetail} />
                    <Route path="/detailBlogs/:name" component={BlogsDetail} />

                    <Route path="/profile/:id" component={CusProfile} />
                    {this.state.isAdmin ===true ?
                        <Route patch="/admin/id642597?=fophabflj" component={AdminDashboard} />
                        :
                        //window.location.href =`${HOME_URL}`
                        <Route component={WarningPage} />
                    }
                </Switch>
            </div>
        )
    }
}

function mapStateToProp(state){
    return{
        isLogin : state.config.checkLogin
    }
}

export default connect(mapStateToProp)(Routing);