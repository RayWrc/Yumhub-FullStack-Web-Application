import React, {Component} from 'react';
import * as constants from "../../Constants/Users";
import UserService from '../../Services/UserServiceClient';
import {connect} from "react-redux";
import * as actions from "../../Actions/UserAction";
import {Route} from "react-router-dom";
import OwnerDashBoardList from "../../Components/OwnerDashboard/OwnerDashBoardList";
import OwnerDashBoardOptionDetail from "./OwnerDashBoardOptionDetail";

class OwnerDashBoard extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.logOut = this.logOut.bind(this);
        this.state = {
            userType: constants.CUSTOMER_USER,
            username: "",
            password: ""
        };
    }

    componentDidMount() {
        this.props.findUser();
    }

    logOut() {
        this.props.logOut();
        this.props.history.push('/');
    }

    render() {
        console.log(this.props.currentUser);
        return (
            <div className="container-fluid">
                <dl className="row">
                    <dt className="col-sm-3">
                        <h1>
                            YumHub
                        </h1>
                    </dt>
                    <dd className="col-sm-9">
                        <div className="float-right">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <h4>
                                        Restaurant Owner: {this.props.currentUser.username}
                                    </h4>
                                </li>
                                <li className="list-inline-item">
                                    <button onClick={this.logOut}
                                            className="btn btn-danger">
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </dd>
                </dl>
                <h2>Owner {this.props.currentUser.username}'s DashBoard</h2>
                <br/>
                <div className="row">
                    <div className="col-sm-3">
                        <OwnerDashBoardList username={this.props.currentUser.username}/>
                    </div>
                    <div className="col-sm-9">
                        <Route path="/dashboard/owner/:username/:option"
                               render={(props) =>
                                   <OwnerDashBoardOptionDetail{...props}/>}>
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
        findUser: () => actions.findUser(dispatch),
        logOut: () => actions.logOut(dispatch)
    }
};

export const OwnerDashBoardContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(OwnerDashBoard);