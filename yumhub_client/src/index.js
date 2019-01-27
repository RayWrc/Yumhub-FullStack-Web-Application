import React from 'react';
import ReactDOM from 'react-dom';
import App from './Containers/App';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import {combineReducers, createStore} from "redux";
import {RestaurantListReducer} from './Reducers/RestaurantListReducer';
import {UserReducer} from './Reducers/UserReducer';
import {Provider} from "react-redux";
import {CustomerReducer} from "./Reducers/CustomerReducer";

let rootReducer = combineReducers({
                                      restaurants: RestaurantListReducer,
                                      users: UserReducer,
                                      customer: CustomerReducer
                                  });
const store = createStore(rootReducer);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);