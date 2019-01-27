import * as constants from "../Constants/RestaurantList";

let initialState = {
    originalRestaurantList: [],
    restaurantList: [],
    restaurantListSort: constants.DEFAULT
};

export const RestaurantListReducer = (state = initialState, action) => {

    switch (action.type) {
        case constants.Restaurant_LIST:
            console.log(action.restaurantList);
            return {
                ...state,
                originalRestaurantList: JSON.parse(JSON.stringify(action.restaurantList)),
                restaurantList: action.restaurantList
            };

        case constants.DEFAULT:
            return {
                ...state,
                restaurantListSort: action.type,
                restaurantList: JSON.parse(JSON.stringify(state.originalRestaurantList))
            };

        case constants.SORT_BY_DISTANCE:
            return {
                ...state,
                restaurantListSort: action.type,
                restaurantList: state.restaurantList.sort((restaurant1, restaurant2) => {
                    return restaurant1.distance - restaurant2.distance;
                })
            };

        case constants.SORT_BY_RATING:
            return {
                ...state,
                restaurantListSort: action.type,
                restaurantList: state.restaurantList.sort((restaurant1, restaurant2) => {
                    return restaurant2.rating - restaurant1.rating;
                })
            };

        default:
            return state;
    }
};