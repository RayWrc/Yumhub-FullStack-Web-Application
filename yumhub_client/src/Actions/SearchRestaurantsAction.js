import SearchRestaurantService from '../Services/SearchRestaurantServiceClient';
import * as constants from "../Constants/RestaurantList";

const searchRestaurantService = SearchRestaurantService.instance;

export const searchRestaurantByCity = (dispatch, cityName) => {
    if (cityName === "") {
        alert("Please enter a valid city name");
    } else {
        // console.log(cityName);
        searchRestaurantService.findRestaurantsByCity(cityName)
            .then((restaurants) => {
                console.log(restaurants);
                dispatch({
                             type: constants.Restaurant_LIST,
                             restaurantList: restaurants
                         })
            });
    }
};

export const sortRestaurantList = (dispatch, sortType) => {
    dispatch({
                 type: sortType
             });
};