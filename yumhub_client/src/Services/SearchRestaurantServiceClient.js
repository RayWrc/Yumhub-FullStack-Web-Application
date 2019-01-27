let _singleton = Symbol();

//const localURL = 'http://localhost:8080';
const localURL = 'http://yumhub-server.us-east-1.elasticbeanstalk.com/';
const findRestaurantsByCityURL = '/api/restaurant/city';


const yelpBusinessDetailURL = '/api/restaurant/detail/Id';

const restaurantMenuURL = '/api/restaurant/restaurantId/dishes';

const allOrdersForRestaurantURL = '/api/restaurant/resId/order';
const OwnerForRestaurantURL = '/api/restaurant/resId/owner';
const allRestaurantsURL = '/api/restaurant';
const deleteRestaurantURL = '/api/restaurant/resId';

const createResForOwnerURL = '/api/admin/restaurant/owner/ownerName';
const adminUpdateResURL = '/api/admin/restaurant/resId';

class SearchRestaurantService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
    }

    static get instance() {
        if (!this[_singleton]) {
            this[_singleton] = new SearchRestaurantService(_singleton);
        }
        return this[_singleton]
    }

    findRestaurantsByCity(cityName) {
        return fetch(localURL + findRestaurantsByCityURL.replace('city', cityName))
            .then(function (response) {
                return response.json();
            });
    }

    findRestaurantDetailByYelpId(id) {
        return fetch(localURL + yelpBusinessDetailURL.replace('Id', id))
            .then((response) => {
                return response.json();
            })

    }

    findRestaurantMenuById(Id) {
        return fetch(localURL + restaurantMenuURL.replace('restaurantId', Id))
            .then((response) => {
                return response.json();
            })

    }

    findOrdersForRestaurant(resId) {
        return fetch(localURL + allOrdersForRestaurantURL.replace('resId', resId))
            .then((response) => {
                return response.json();
            })

    }

    findAllRestaurants() {
        return fetch(localURL + allRestaurantsURL)
            .then(function (response) {
                return response.json();
            });
    }

    findOwnerForRestaurant(resId) {
        let promise = fetch(localURL + OwnerForRestaurantURL.replace('resId', resId));

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

    deleteRestaurantById(resId) {
        return fetch(localURL + deleteRestaurantURL.replace('resId', resId),
            {
                method: 'delete'
            })
    }

    createRestaurantForOwner(restaurant, username) {
        let promise = fetch(localURL + createResForOwnerURL.replace('ownerName', username),
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

    adminUpdateRes(restaurant, resId) {
        return fetch(localURL + adminUpdateResURL.replace('resId', resId),
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

}

export default SearchRestaurantService;