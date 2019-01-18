import * as constants from "../Constants/Users";

let _singleton = Symbol();

const localURL = 'http://localhost:8080';
const currentUserURL = '/api/currentUser';
const currentUserLogOutURL = '/api/currentUser/logOut';
const customerLoginURL = '/api/customer/login';
const customerSignUpURL = '/api/customer/signUp';

const userProfileUpdateURL = '/api/user/profile/update';

const ownerSignUpURL = '/api/owner/signUp';
const ownerLogInURL = '/api/owner/logIn';

const delivererSignUpURL = '/api/deliverer/signUp';
const delivererLogInURL = '/api/deliverer/logIn';

const findAllDeliverersURL = '/api/deliverer';
const delivererProfileUpdateURL = '/api/deliverer/profile/update';

const adminSignUpURL = '/api/admin/signUp';
const adminLogInURL = '/api/admin/logIn';
const allUsersURL = '/api/admin/user';

const deleteUserByIDURL = '/api/user/delete/userId';
const adminUpdateUserURL = '/api/admin/user/update';
const adminUpdateDelivererURL = '/api/admin/deliverer/update';
const adminCreateUserURL = '/api/admin/create/user';

class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
    }

    static get instance() {
        if (!this[_singleton]) {
            this[_singleton] = new UserService(_singleton);
        }
        return this[_singleton]
    }

    findCurrentUser() {
        let promise = fetch(localURL + currentUserURL,
            {
                credentials: 'include'
            });

        return promise.then(function (value) {
            return value.text().then(function (value2) {
                //console.log(value2);
                if (value2 === "") {
                    return constants.ANONYMOUS_USER;
                } else {
                    return JSON.parse(value2);
                }
            });
        });
    }

    userLogin(user) {
        if (user.userType === constants.CUSTOMER_USER) {
            let promise = fetch(localURL + customerLoginURL,
                {
                    credentials: 'include',
                    method: 'post',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

            return promise.then(function (value) {
                return value.text().then(function (value2) {
                    if (value2 === "") {
                        return null;
                    } else {
                        return JSON.parse(value2);
                    }
                });
            })
        } else if (user.userType === constants.OWNER_USER) {
            let promise = fetch(localURL + ownerLogInURL,
                {
                    credentials: 'include',
                    method: 'post',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

            return promise.then(function (value) {
                return value.text().then(function (value2) {
                    if (value2 === "") {
                        return null;
                    } else {
                        return JSON.parse(value2);
                    }
                });
            })
        } else if (user.userType === constants.DELIVERER_USER) {
            let promise = fetch(localURL + delivererLogInURL,
                {
                    credentials: 'include',
                    method: 'post',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

            return promise.then(function (value) {
                return value.text().then(function (value2) {
                    if (value2 === "") {
                        return null;
                    } else {
                        return JSON.parse(value2);
                    }
                });
            })
        } else if (user.userType === constants.ADMIN_USER) {
            let promise = fetch(localURL + adminLogInURL,
                {
                    credentials: 'include',
                    method: 'post',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

            return promise.then(function (value) {
                return value.text().then(function (value2) {
                    if (value2 === "") {
                        return null;
                    } else {
                        return JSON.parse(value2);
                    }
                });
            })
        }
    }

    userLogOut() {
        return fetch(localURL + currentUserLogOutURL,
            {
                credentials: 'include',
                method: 'post'
            });

    }

    userSignUp(user) {
        if (user.userType === constants.CUSTOMER_USER) {
            let promise = fetch(localURL + customerSignUpURL,
                {
                    credentials: 'include',
                    method: 'post',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

            return promise.then(function (value) {
                return value.text().then(function (value2) {
                    if (value2 === "") {
                        return null;
                    } else {
                        return JSON.parse(value2);
                    }
                });
            })
        } else if (user.userType === constants.OWNER_USER) {
            let promise = fetch(localURL + ownerSignUpURL,
                {
                    credentials: 'include',
                    method: 'post',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

            return promise.then(function (value) {
                return value.text().then(function (value2) {
                    if (value2 === "") {
                        return null;
                    } else {
                        return JSON.parse(value2);
                    }
                });
            })
        } else if (user.userType === constants.DELIVERER_USER) {
            let promise = fetch(localURL + delivererSignUpURL,
                {
                    credentials: 'include',
                    method: 'post',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

            return promise.then(function (value) {
                return value.text().then(function (value2) {
                    if (value2 === "") {
                        return null;
                    } else {
                        return JSON.parse(value2);
                    }
                });
            })
        } else if (user.userType === constants.ADMIN_USER) {
            let promise = fetch(localURL + adminSignUpURL,
                {
                    credentials: 'include',
                    method: 'post',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

            return promise.then(function (value) {
                return value.text().then(function (value2) {
                    if (value2 === "") {
                        return null;
                    } else {
                        return JSON.parse(value2);
                    }
                });
            })

        }
    }

    profileUpdate(user) {
        return fetch(localURL + userProfileUpdateURL,
            {
                credentials: 'include',
                method: 'put',
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (value) {
            return value.text().then(function (value2) {
                if (value2 === "") {
                    return null;
                } else {
                    return JSON.parse(value2);
                }
            })

        });
    }

    delivererProfileUpdate(user) {
        return fetch(localURL + delivererProfileUpdateURL,
            {
                credentials: 'include',
                method: 'put',
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (value) {
            return value.text().then(function (value2) {
                if (value2 === "") {
                    return null;
                } else {
                    return JSON.parse(value2);
                }
            })

        });
    }

    findAllDeliverers() {
        return fetch(localURL + findAllDeliverersURL, {
                                                          credentials: 'include'
                                                      })
            .then(function (response) {
                return response.json();
            });
    }

    findAllUsers() {
        return fetch(localURL + allUsersURL, {
                                                 credentials: 'include'
                                             })
            .then(function (response) {
                return response.json();
            });
    }

    deleteUserById(userId) {
        return fetch(localURL + deleteUserByIDURL.replace('userId', userId),
            {
                method: 'delete',
                credentials: 'include'
            });
    }

    adminUpdateUser(user){
        return fetch(localURL + adminUpdateUserURL,
            {
                credentials: 'include',
                method: 'put',
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (value) {
            return value.text().then(function (value2) {
                if (value2 === "") {
                    return null;
                } else {
                    return JSON.parse(value2);
                }
            })

        });
    }

    adminUpdateDeliverer(user){
        return fetch(localURL + adminUpdateDelivererURL,
            {
                credentials: 'include',
                method: 'put',
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (value) {
            return value.text().then(function (value2) {
                if (value2 === "") {
                    return null;
                } else {
                    return JSON.parse(value2);
                }
            })

        });
    }

    adminCreateUser(user){
        let promise = fetch(localURL + adminCreateUserURL,
            {
                credentials: 'include',
                method: 'post',
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                }
            });

        return promise.then(function (value) {
            return value.text().then(function (value2) {
                if (value2 === "") {
                    return null;
                } else {
                    return JSON.parse(value2);
                }
            });
        })
    }


}

export default UserService;