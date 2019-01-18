import React, {Component} from 'react';
import UserService from "../../../Services/UserServiceClient";
import OwnerOrderItem from "./OwnerOrderItem";
import OwnerService from "../../../Services/OwnerServiceClient";
import SearchRestaurantService from "../../../Services/SearchRestaurantServiceClient";

class OwnerRecentOrders extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.ownerService = OwnerService.instance;
        this.searchRestaurantService = SearchRestaurantService.instance;
        this.acceptOrder = this.acceptOrder.bind(this);
        this.chooseDeliverer = this.chooseDeliverer.bind(this);
        this.writeReplyForReview = this.writeReplyForReview.bind(this);
        this.updateReplyForReview = this.updateReplyForReview.bind(this);
        this.state = {
            userId: 0,
            restaurant: {},
            orders: [],
            deliverers: [],
            user: {}
        };
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then((user) => {
                return this.setState({
                                         userId: user.id,
                                         restaurant: user.restaurant,
                                         user: user
                                     }, () => {
                    if (this.state.restaurant !== null) {
                        this.searchRestaurantService
                            .findOrdersForRestaurant(this.state.restaurant.id).then((orders) => {
                            this.setState({
                                              orders: orders
                                          })
                        })
                    }
                })
            });
        this.userService.findAllDeliverers().then((deliverers) => {
            this.setState({
                              deliverers: deliverers
                          })
        })
    }

    acceptOrder(orderId) {
        this.ownerService.acceptOrder(orderId).then(() => {
            alert("You have accepted this order");
            this.searchRestaurantService
                .findOrdersForRestaurant(this.state.restaurant.id).then((orders) => {
                this.setState({
                                  orders: orders
                              })
            })
        })
    }

    chooseDeliverer(delivererId, orderId) {
        this.ownerService.chooseDeliverer(delivererId, orderId).then(() => {
            alert('Your already have chosen this deliverer');
            this.searchRestaurantService
                .findOrdersForRestaurant(this.state.restaurant.id).then((orders) => {
                this.setState({
                                  orders: orders
                              })
            })

        });
    }

    writeReplyForReview(reply, reviewId) {
        this.ownerService.writeReplyForReview(reply, reviewId).then(() => {
            alert('Your Reply has already been recorded');
            this.searchRestaurantService
                .findOrdersForRestaurant(this.state.restaurant.id).then((orders) => {
                this.setState({
                                  orders: orders
                              })
            })
        })
    }

    updateReplyForReview(reply, reviewId) {
        this.ownerService.updateReplyForReview(reply, reviewId).then(() => {
            alert('Your Reply has already been updated');
            this.searchRestaurantService
                .findOrdersForRestaurant(this.state.restaurant.id).then((orders) => {
                this.setState({
                                  orders: orders
                              })
            })
        })
    }

    renderRecentOrders() {
        let recentOrders = null;
        if (this.state.orders.length !== 0) {
            recentOrders = this.state.orders.map(
                (order) => {
                    return <OwnerOrderItem key={order.id}
                                           created={order.created}
                                           deliverer={order.deliver}
                                           allDeliverers={this.state.deliverers}
                                           note={order.note}
                                           orderItems={order.orderItems}
                                           restaurant={order.restaurant}
                                           orderStatus={order.status}
                                           orderReview={order.review}
                                           orderId={order.id}
                                           customer={order.customer}
                                           chooseDeliverer={this.chooseDeliverer}
                                           writeReplyForReview={this.writeReplyForReview}
                                           updateReplyForReview={this.updateReplyForReview}
                                           acceptOrder={this.acceptOrder}
                                           address={order.customer.address}/>
                });
        }

        return recentOrders;
    }

    render() {

        console.log(this.state.deliverers);
        return (
            <div className="container-fluid">
                <h2 id="title">
                    Recent Orders
                </h2>
                {
                    this.state.restaurant !== null && this.state.orders.length !== 0 &&
                    <div className="list-group">
                        {this.renderRecentOrders()}
                    </div>
                }
                {
                    this.state.restaurant === null &&
                    <div>
                        <br/>
                        <br/>
                        <h2>
                            You need to create your own restaurant first.
                        </h2>
                    </div>

                }
                {
                    this.state.orders.length === 0 && this.state.restaurant !== null &&
                    <div>
                        <br/>
                        <br/>
                        <h2>
                            You do not receive orders recently.
                        </h2>
                    </div>

                }
            </div>

        )
    }
}

export default OwnerRecentOrders;