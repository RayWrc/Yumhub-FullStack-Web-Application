import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {SearchRestaurantContainer} from "./SearchRestaurant/SearchRestaurant";
import {RestaurantDetailContainer} from './Restaurants/RestaurantDetail';
import LogIn from './UserConsole/LogIn';
import {SearchRestaurantResultContainer} from "./Restaurants/SearchRestaurantsResult";
import {CustomerDashBoardContainer} from './Customer/CustomerDashBoard'
import SignUp from "./UserConsole/SignUp";
import {OwnerDashBoardContainer} from "./Owner/OwnerDashBoard";
import {DelivererDashBoardContainer} from "./Deliverer/DelivererDashBoard";
import {AdminDashBoardContainer} from "./Admin/AdminDashBoard";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch className="container-fluid">
                    <Route exact path="/"
                           render={(props) =>
                               <SearchRestaurantContainer {...props}/>}/>
                    <Route path="/restaurants/:cityName"
                           render={(props) =>
                               <SearchRestaurantResultContainer {...props}/>}/>
                    <Route path="/restaurantDetail/:yelpId"
                           render={(props) =>
                               <RestaurantDetailContainer {...props}/>}/>
                    <Route path="/logIn" render={(props) =>
                        <LogIn {...props}/>}/>
                    <Route path="/signUp" render={(props) =>
                        <SignUp {...props}/>}/>
                    <Route path="/profile/customer/:userName"
                           render={(props) => <CustomerDashBoardContainer {...props}/>}/>
                    <Route path="/dashboard/owner/:userName"
                           render={(props) => <OwnerDashBoardContainer {...props}/>}/>
                    <Route path="/dashboard/deliverer/:userName"
                           render={(props) => <DelivererDashBoardContainer {...props}/>}/>
                    <Route path="/dashboard/admin/:userName"
                           render={(props) => <AdminDashBoardContainer {...props}/>}/>
                </Switch>
            </Router>
        );
    }

}

export default App;
