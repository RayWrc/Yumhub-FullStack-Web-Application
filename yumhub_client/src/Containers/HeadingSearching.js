import React, {Component} from 'react';

import {connect} from "react-redux";
import AnonymousUserSearchHeading from "../Components/Restaurants/AnonymousRestaurant/AnonymousUserSearchHeading";
import CustomerUserSearchHeading from "../Components/Restaurants/CustomerRestaurant/CustomerUserSearchHeading";
import * as constants from "../Constants/Users";
import * as actions from "../Actions/UserAction";

class HeadingSearching extends Component {
    constructor() {
        super();
        //this.searchRestaurantService = SearchRestaurantService.instance;
        this.findRestaurantsByCity = this.findRestaurantsByCity.bind(this);
        this.cityNameChanged = this.cityNameChanged.bind(this);
        this.logOut = this.logOut.bind(this);

        this.state = {
            cityName: "",
            path: "/restaurants/cityName"
        };
    }

    componentDidMount() {
        this.props.findUser();
    }

    findRestaurantsByCity() {
        if (this.state.cityName === "") {
            alert("Please enter a valid city name");
        } else {
            // BrowserRouter.push(this.state.path.replace('cityName', this.state.cityName));

            this.props.props.history.push(this.state.path.replace('cityName', this.state.cityName));

        }
    }

    cityNameChanged(event) {
        this.setState({
                          cityName: event.target.value
                      });
    }

    logOut() {
        this.props.logOut();
        this.props.props.history.push('/');
    }

    render() {
        //console.log(this.props.userType);
        return (
            <div className="container-fluid">
                {
                    this.props.userType === constants.ANONYMOUS_USER &&
                    <AnonymousUserSearchHeading/>
                }
                {
                    this.props.userType === constants.CUSTOMER_USER &&
                    <CustomerUserSearchHeading
                        currentUser={this.props.currentUser}
                        logOut={this.logOut}
                        props={this.props}/>
                }
                <br/>
                <div className="form-group">
                    <label htmlFor="address">Find restaurants near you and order online</label>
                    <input onChange={this.cityNameChanged}
                           className="form-control shadow p-3 mb-5 bg-white rounded"
                           id="address"
                           placeholder="City name"/>

                </div>
                <button onClick={this.findRestaurantsByCity}
                        className="btn btn-success">Find restaurants
                </button>

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

export const HeadingSearchingContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(HeadingSearching);