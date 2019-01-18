import React, {Component} from 'react';
import * as constants from "../../Constants/Users";
import UserService from '../../Services/UserServiceClient';
import CustomerDashBoardList from '../../Components/CustomerDashboard/CustomerDashBoardList';
import DashBoardOptionDetail from './DashBoardOptionDetail';
import {connect} from "react-redux";
import * as actions from "../../Actions/UserAction";
import {HeadingSearchingContainer} from "../HeadingSearching";
import {Route} from "react-router-dom";

class CustomerDashBoard extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
    }


    render() {
        console.log(this.props.currentUser);
        return (
            <div className="container-fluid">
                <HeadingSearchingContainer props={this.props}/>
                <br/>
                <h2>Customer {this.props.currentUser.username}'s DashBoard</h2>
                <br/>
                <div className="row">
                    <div className="col-sm-3">
                        <CustomerDashBoardList username={this.props.currentUser.username}/>
                    </div>
                    <div className="col-sm-9">
                        <Route path="/profile/customer/:username/:option"
                               render={(props) =>
                                   <DashBoardOptionDetail {...props}/>}>
                        </Route>
                    </div>
                </div>


            </div>

        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        userType: state.users.userType,
        currentUser: state.users.currentUser
    }
};

const dispatcherToPropertyMapper = (dispatch) => {

    return {
        findUser: () => actions.findUser(dispatch)
    }
};

export const CustomerDashBoardContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(CustomerDashBoard);

//export default CustomerDashBoard;