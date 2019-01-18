import * as constants from "../Constants/Customer";

let initialState = {
    shoppingCartItems: []
};

export const CustomerReducer = (state = initialState, action) => {

    switch (action.type) {
        case constants.FIND_SHOPPING_CART_ITEMS:
           // console.log(action.shoppingCartItems);
            return {...state, shoppingCartItems: action.shoppingCartItems};

        default:
            return state;
    }
};