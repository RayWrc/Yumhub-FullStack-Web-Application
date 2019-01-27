import React, {Component} from 'react';
import * as actions from '../../Actions/UserAction';
import * as constants from '../../Constants/Users';
import {connect} from "react-redux";
import AnonymousUserSearchHeading from '../../Components/Restaurants/AnonymousRestaurant/AnonymousUserSearchHeading';
import CustomerUserSearchHeading from '../../Components/Restaurants/CustomerRestaurant/CustomerUserSearchHeading';

class SearchRestaurant extends Component {
    constructor() {
        super();
        //this.searchRestaurantService = SearchRestaurantService.instance;
        this.findRestaurantsByCity = this.findRestaurantsByCity.bind(this);
        this.cityNameChanged = this.cityNameChanged.bind(this);

        this.state = {
            cityName: "",
            path: "/restaurants/cityName"
        };
    }

    componentDidMount() {
        this.props.findUser();
    }

    componentDidUpdate() {
        if (this.props.userType === constants.OWNER_USER) {
            //console.log(1);
            let path = '/dashboard/owner/username';
            this.props.history.push(path.replace('username', this.props.currentUser.username));
        }
        if (this.props.userType === constants.DELIVERER_USER) {
            //console.log(1);
            let path = '/dashboard/deliverer/username';
            this.props.history.push(path.replace('username', this.props.currentUser.username));
        }
        if (this.props.userType === constants.ADMIN_USER) {
            //console.log(1);
            let path = '/dashboard/admin/username';
            this.props.history.push(path.replace('username', this.props.currentUser.username));
        }
    }

    findRestaurantsByCity() {
        if (this.state.cityName === "") {
            alert("Please enter a valid city name");
        } else {
            // BrowserRouter.push(this.state.path.replace('cityName', this.state.cityName));

            this.props.history.push(this.state.path.replace('cityName', this.state.cityName));

        }
    }

    cityNameChanged(event) {
        this.setState({
                          cityName: event.target.value
                      });
    }

    render() {
        //  console.log(this.props.userType);
        return (
            <div className="container-fluid">
                {
                    this.props.userType === constants.ANONYMOUS_USER &&
                    <div>
                        <AnonymousUserSearchHeading/>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="address">Find restaurants near you and order
                                online</label>
                            <input onChange={this.cityNameChanged}
                                   className="form-control shadow p-3 mb-5 bg-white rounded"
                                   id="address"
                                   placeholder="City name"/>

                        </div>
                        <button onClick={this.findRestaurantsByCity}
                                className="btn btn-success">Find restaurants
                        </button>
                    </div>

                }
                {
                    this.props.userType === constants.CUSTOMER_USER &&
                    <div>
                        <CustomerUserSearchHeading
                            currentUser={this.props.currentUser}
                            logOut={this.props.logOut}
                            props={this.props}/>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="address">Find restaurants near you and order
                                online</label>
                            <input onChange={this.cityNameChanged}
                                   className="form-control shadow p-3 mb-5 bg-white rounded"
                                   id="address"
                                   placeholder="City name"/>

                        </div>
                        <button onClick={this.findRestaurantsByCity}
                                className="btn btn-success">Find restaurants
                        </button>
                    </div>
                }
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

export const SearchRestaurantContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(SearchRestaurant);

