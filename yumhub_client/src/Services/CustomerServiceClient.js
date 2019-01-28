let _singleton = Symbol();

//const localURL = 'http://localhost:8080';
const localURL = 'http://yumhub-server.us-east-1.elasticbeanstalk.com';
const addDishToShoppingCartURL = '/api/shoppingCart/shoppingCartId/dish/dishId';
const findShoppingCartItemsURL = '/api/shoppingCart/shoppingCartId';
const updateItemQuantityURL = '/api/shoppingCartItem/shoppingCartItemId/quantity';
const deleteItemURL = '/api/shoppingCartItem/shoppingCartItemId';
const getTotalPriceForShoppingCartURL = '/api/shoppingCart/price/shoppingCartId';
const placeOrderURL = '/api/shoppingCart/shoppingCartId';

const recentOrdersURL = '/api/customer/orders/customerId';
const confirmURL = '/api/order/confirm/orderId';
const writeReviewURL = '/api/order/review/orderId';

class CustomerService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
    }

    static get instance() {
        if (!this[_singleton]) {
            this[_singleton] = new CustomerService(_singleton);
        }
        return this[_singleton]
    }

    addDishToShoppingCart(dishId, shoppingCartId) {
        let promise = fetch(localURL + addDishToShoppingCartURL.replace('shoppingCartId',
                                                                        shoppingCartId)
            .replace('dishId', dishId),
            {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                }
            });

        return promise.then(function (value) {
            return value.text().then(function (value2) {
                //console.log(value2);
                if (value2 === "") {
                    return null;
                } else {
                    return JSON.parse(value2);
                }
            });
        });
    }

    findShoppingCartItems(shoppingCartId) {
        return fetch(localURL + findShoppingCartItemsURL.replace('shoppingCartId', shoppingCartId))
            .then(function (response) {
                return response.json();
            });
    }

    updateItemQuantity(itemId, quantity) {
        return fetch(localURL + updateItemQuantityURL.replace('shoppingCartItemId', itemId)
            .replace('quantity', quantity),
            {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (value) {
            return value.text().then(function (value2) {
                if (value2 === "") {
                    return null;
                } else {
                    return value2;
                }
            })
        });
    }

    removeItem(itemId) {
        return fetch(localURL + deleteItemURL.replace('shoppingCartItemId', itemId),
            {
                method: 'delete'
            });
    }

    getTotalPriceForShoppingCart(shoppingCartId) {
        return fetch(localURL + getTotalPriceForShoppingCartURL.replace('shoppingCartId',
                                                                        shoppingCartId))
            .then(function (response) {
                //console.log(response);
                return response.json();
            });
    }

    placeOrder(shoppingCartId, note) {
        return fetch(localURL + placeOrderURL.replace('shoppingCartId', shoppingCartId),
            {
                method: 'post',
                body: JSON.stringify(note),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (value) {
            return value.text().then(function (value2) {
                if (value2 === "") {
                    return null;
                } else {
                    return value2;
                }
            })
        });
    }

    recentOrders(customerId) {
        return fetch(localURL + recentOrdersURL.replace('customerId', customerId))
            .then(function (response) {
                return response.json();
            });
    }

    confirmReceive(orderId) {
        return fetch(localURL + confirmURL.replace('orderId', orderId),
            {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (value) {
            return value.text().then(function (value2) {
                if (value2 === "") {
                    return null;
                } else {
                    return value2;
                }
            })
        });
    }

    writeReview(review, orderId) {
        return fetch(localURL + writeReviewURL.replace('orderId', orderId),
            {
                method: 'post',
                body: JSON.stringify(review),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (value) {
            return value.text().then(function (value2) {
                if (value2 === "") {
                    return null;
                } else {
                    return value2;
                }
            })
        });
    }

    updateReview(review, orderId) {
        return fetch(localURL + writeReviewURL.replace('orderId', orderId),
            {
                method: 'put',
                body: JSON.stringify(review),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (value) {
            return value.text().then(function (value2) {
                if (value2 === "") {
                    return null;
                } else {
                    return value2;
                }
            })
        });
    }

}

export default CustomerService;