let _singleton = Symbol();

//const localURL = 'http://localhost:8080';
const localURL = 'http://yumhub-server.us-east-1.elasticbeanstalk.com/';
const allOrdersForDelivererURL = '/api/deliverer/dId/order';
const confirmURL = '/api/deliverer/dId/order/orderId/confirm';

class DelivererService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
    }

    static get instance() {
        if (!this[_singleton]) {
            this[_singleton] = new DelivererService(_singleton);
        }
        return this[_singleton]
    }

    findAllOrdersForDeliverer(dId) {
        return fetch(localURL + allOrdersForDelivererURL.replace('dId', dId))
            .then(function (response) {
                return response.json();
            });

    }

    confirmDelivery(orderId, userId) {
        return fetch(localURL + confirmURL.replace('dId', userId).replace('orderId', orderId),
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

}

export default DelivererService;