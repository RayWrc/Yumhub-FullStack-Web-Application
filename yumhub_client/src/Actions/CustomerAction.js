import * as constants from "../Constants/Customer";
import CustomerService from '../Services/CustomerServiceClient';

const customerService = CustomerService.instance;

export const updateShoppingCart = (dispatch, shoppingCartId) => {
    customerService.findShoppingCartItems(shoppingCartId)
        .then((shoppingCartItems) => {
            //console.log(shoppingCartItems);
            dispatch({
                         type: constants.FIND_SHOPPING_CART_ITEMS,
                         shoppingCartItems: shoppingCartItems
                     });
        });
};

