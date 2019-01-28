let _singleton = Symbol();

//const localURL = 'http://localhost:8080';
const localURL = 'http://yumhub-server.us-east-1.elasticbeanstalk.com';
const findAllOrdersURL = '/api/admin/orders';
const deleteOrderByIdURL = '/api/admin/order/orderId';
const updateOrderByIdURL = '/api/admin/order/orderId/status/note';

class AdminService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
    }

    static get instance() {
        if (!this[_singleton]) {
            this[_singleton] = new AdminService(_singleton);
        }
        return this[_singleton]
    }

    findAllOrders() {
        return fetch(localURL + findAllOrdersURL)
            .then(function (response) {
                return response.json();
            });
    }

    deleteOrderById(orderId) {
        return fetch(localURL + deleteOrderByIdURL.replace('orderId', orderId),
            {
                method: 'delete'
            })
    }

    adminUpdateOrder(order, orderId, orderStatus) {
        return fetch(localURL + updateOrderByIdURL.replace('orderId', orderId)
            .replace('status', orderStatus).replace('note', order),
            {
                method: 'put',
                body: JSON.stringify(orderId),
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

export default AdminService;