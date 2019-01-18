import * as constants from "../Constants/Users";

let initialState = {
    userType: "",
    currentUser: {}
};

export const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case constants.ANONYMOUS_USER:
            return {...state, userType: constants.ANONYMOUS_USER};
        case constants.CUSTOMER_USER:
            return{
                ...state,
                userType: constants.CUSTOMER_USER,
                currentUser: action.currentUser};
        case constants.OWNER_USER:
            return{
                ...state,
                userType: constants.OWNER_USER,
                currentUser: action.currentUser};
        case constants.DELIVERER_USER:
            return{
                ...state,
                userType: constants.DELIVERER_USER,
                currentUser: action.currentUser};
        case constants.ADMIN_USER:
            return{
                ...state,
                userType: constants.ADMIN_USER,
                currentUser: action.currentUser};
        case constants.LOG_OUT:
            return{...state, userType: constants.ANONYMOUS_USER};
        default:
            return state;
    }
};