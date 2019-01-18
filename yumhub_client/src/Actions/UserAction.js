import * as constants from "../Constants/Users";
import UserService from '../Services/UserServiceClient';

const userService = UserService.instance;

export const findUser = (dispatch) => {
    userService.findCurrentUser()
        .then((user) => {
           // console.log(user);
            if(user === constants.ANONYMOUS_USER){
                dispatch({
                             type: constants.ANONYMOUS_USER
                         });
            }else{
                dispatch({
                             type: user.userType,
                             currentUser: user
                         });
            }
        });
};


export const logOut = (dispatch) => {
    userService.userLogOut()
        .then(() => {
            dispatch({
                         type: constants.LOG_OUT
                     });
        });

};