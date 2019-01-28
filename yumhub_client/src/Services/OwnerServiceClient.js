let _singleton = Symbol();

//const localURL = 'http://localhost:8080';
const localURL = 'http://yumhub-server.us-east-1.elasticbeanstalk.com';
const createRestaurantForOwnerURL = '/api/restaurant/owner/ownerId';
const findRestaurantForOwnerURL = '/api/restaurant/owner/ownerId';
const restaurantInfoUpdateURL = '/api/restaurant/info/update';
const addDishToRestaurantURL = '/api/restaurant/resId/dish';
const deleteDishForRestaurantURL = '/api/dish/dishId';
const updateDishURL = '/api/dish/dishId';

const findPicsForResURL = '/api/res/resId/pic';
const addLinkToResURL = '/api/restaurant/resId/link';
const deletePicLinkURL = '/api/picLink/linkId';
const updatePicLinkURL = '/api/picLink/linkId';

const acceptOrderURL = '/api/order/accept/orderId';
const assignDelivererOrderURL = '/api/order/orderId/deliverer/delivererId';
const writeReplyReviewURL = '/api/review/reviewId/reply';
const updateReplyReviewURL = '/api/review/reviewId/reply';

class OwnerService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
    }

    static get instance() {
        if (!this[_singleton]) {
            this[_singleton] = new OwnerService(_singleton);
        }
        return this[_singleton]
    }

    createRestaurant(restaurant, ownerId) {
        let promise = fetch(localURL + createRestaurantForOwnerURL.replace('ownerId', ownerId),
            {
                method: 'post',
                body: JSON.stringify(restaurant),
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

    findRestaurantForOwner(ownerId) {
        return fetch(localURL + findRestaurantForOwnerURL.replace('ownerId', ownerId))
            .then(function (response) {
                return response.text().then(function (value2) {
                    if (value2 === "") {
                        return null;
                    } else {
                        return JSON.parse(value2);
                    }
                })
            });
    }

    restaurantInfoUpdate(restaurant) {
        return fetch(localURL + restaurantInfoUpdateURL,
            {
                method: 'put',
                body: JSON.stringify(restaurant),
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

    addDishForRestaurant(dish, resId) {
        let promise = fetch(localURL + addDishToRestaurantURL.replace('resId', resId),
            {
                method: 'post',
                body: JSON.stringify(dish),
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

    deleteDishForRestaurant(dishId) {
        return fetch(localURL + deleteDishForRestaurantURL.replace('dishId', dishId),
            {
                method: 'delete'
            });

    }

    updateDish(dish, dishId) {
        return fetch(localURL + updateDishURL.replace('dishId', dishId),
            {
                method: 'put',
                body: JSON.stringify(dish),
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

    addPicLinkForRestaurant(pic, resId) {
        let promise = fetch(localURL + addLinkToResURL.replace('resId', resId),
            {
                method: 'post',
                body: JSON.stringify(pic),
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

    updateDescriptionPic(pic, picId) {
        return fetch(localURL + updatePicLinkURL.replace('linkId', picId),
            {
                method: 'put',
                body: JSON.stringify(pic),
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

    deletePicForRestaurant(picId) {
        return fetch(localURL + deletePicLinkURL.replace('linkId', picId),
            {
                method: 'delete'
            });

    }

    findAllPics(resId) {
        return fetch(localURL + findPicsForResURL.replace('resId', resId))
            .then(function (response) {
                return response.text().then(function (value2) {
                    if (value2 === "") {
                        return null;
                    } else {
                        return JSON.parse(value2);
                    }
                })
            });
    }

    acceptOrder(orderId) {
        return fetch(localURL + acceptOrderURL.replace('orderId', orderId),
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
                    return JSON.parse(value2);
                }
            })

        });

    }

    chooseDeliverer(delivererId, orderId) {
        return fetch(localURL + assignDelivererOrderURL
            .replace('orderId', orderId).replace('delivererId', delivererId),
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
                    return JSON.parse(value2);
                }
            })

        });

    }

    writeReplyForReview(reply, reviewId) {
        let promise = fetch(localURL + writeReplyReviewURL.replace('reviewId', reviewId),
            {
                method: 'post',
                body: reply,
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

    updateReplyForReview(reply, reviewId) {
        let promise = fetch(localURL + updateReplyReviewURL.replace('reviewId', reviewId),
            {
                method: 'put',
                body: reply,
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

export default OwnerService;