import React, {Component} from 'react';
import RestaurantCard from '../../Components/Restaurants/RestaurantCard'
import * as constants from "../../Constants/RestaurantList"
import * as actions from "../../Actions/SearchRestaurantsAction";
import {connect} from "react-redux";
import {HeadingSearchingContainer} from "../HeadingSearching";

class SearchRestaurantsResult extends Component {
    constructor(props) {
        super(props);
        this.cityName = this.props.match.params.cityName;
        this.selectRestaurant = this.selectRestaurant.bind(this);

        this.state = {
            cityName: this.cityName
        };
    }

    componentDidMount() {
        //console.log(1);
        this.props.findRestaurantsByCity(this.state.cityName);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.cityName !== prevProps.match.params.cityName) {
            // console.log(this.props);
            this.props.findRestaurantsByCity(this.props.match.params.cityName);
        }
    }

    renderRestaurants() {
        //console.log(this.props.restaurantList);
        let restaurantCards = null;
        if (this.props.restaurantList != null) {
            restaurantCards = this.props.restaurantList.map(
                (restaurant) => {
                    return <RestaurantCard key={restaurant.yelpId}
                                           res={restaurant}
                                           selectRestaurant={this.selectRestaurant}/>
                });
        }

        return restaurantCards;

    }

    selectRestaurant(Id) {
        this.props.history.push('/restaurantDetail/' + Id);
    }

    render() {
        return (
            <div className="container-fluid">
                <HeadingSearchingContainer props={this.props}/>
                <div className="float-right">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            Sort:
                        </li>
                        <li className="list-inline-item">
                            <select onChange={(event) => {
                                let restaurantListSort = event.target.value;
                                this.props.sortRestaurantList(restaurantListSort);
                            }} className="custom-select-sm  wbdv-btn-right-margin"
                                    value={this.props.restaurantListSort}>
                                <option value={constants.DEFAULT}>Default</option>
                                <option value={constants.SORT_BY_RATING}>Rating: High to Low
                                </option>
                                <option value={constants.SORT_BY_DISTANCE}>Distance: Near to Far
                                </option>
                            </select>
                        </li>
                    </ul>
                </div>
                <br/>
                <br/>
                <div className="row align-items-sm-stretch">
                    {this.renderRestaurants()}
                </div>
            </div>

        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        restaurantList: state.restaurants.restaurantList,
        restaurantListSort: state.restaurants.restaurantListSort
    }
};

const dispatcherToPropertyMapper = (dispatch) => {

    return {
        findRestaurantsByCity: (cityName) => actions.searchRestaurantByCity(dispatch, cityName),
        sortRestaurantList: (sortType) => actions.sortRestaurantList(dispatch, sortType)
    }
};

export const SearchRestaurantResultContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(SearchRestaurantsResult);