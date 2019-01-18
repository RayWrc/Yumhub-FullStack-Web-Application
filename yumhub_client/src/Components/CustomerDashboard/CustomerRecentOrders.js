import React, {Component} from 'react';
import UserService from "../../Services/UserServiceClient";
import CustomerService from "../../Services/CustomerServiceClient";
import CustomerOrderItem from "./CustomerOrderItem";

class CustomerRecentOrders extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.customerService = CustomerService.instance;
        this.confirmReceive = this.confirmReceive.bind(this);
        this.writeReview = this.writeReview.bind(this);
        this.updateReview = this.updateReview.bind(this);
        this.state = {
            userId: 0,
            user: {},
            orders: []
        };
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then((user) => {
                return this.setState({
                                         userId: user.id,
                                         user: user

                                     })
            }).then(() => {
            this.customerService.recentOrders(this.state.userId).then((orders) => {
                this.setState({
                                  orders: orders
                              })

            })

        })
    }

    confirmReceive(orderId) {
        this.customerService.confirmReceive(orderId).then(() => {
            alert("You have confirmed receiving");
            this.customerService.recentOrders(this.state.userId).then((orders) => {
                this.setState({
                                  orders: orders
                              })

            })
        })
    }

    writeReview(review, orderId) {
        this.customerService.writeReview(review, orderId).then(() => {
            alert('Your review has been recorded');
            this.customerService.recentOrders(this.state.userId).then((orders) => {
                this.setState({
                                  orders: orders
                              })

            })

        });
    }

    updateReview(review, orderId) {
        this.customerService.updateReview(review, orderId).then(() => {
            alert('Your review has been updated');
            this.customerService.recentOrders(this.state.userId).then((orders) => {
                this.setState({
                                  orders: orders
                              })

            })

        });
    }

    renderRecentOrders() {
        let recentOrders = null;
        if (this.state.orders.length !== 0) {
            recentOrders = this.state.orders.map(
                (order) => {
                    return <CustomerOrderItem key={order.id}
                                              created={order.created}
                                              deliverer={order.deliver}
                                              note={order.note}
                                              orderItems={order.orderItems}
                                              restaurant={order.restaurant}
                                              orderStatus={order.status}
                                              orderReview={order.review}
                                              orderId={order.id}
                                              confirmReceive={this.confirmReceive}
                                              writeReview={this.writeReview}
                                              updateReview={this.updateReview}
                                              address={this.state.user.address}/>
                });
        }

        return recentOrders;
    }

    render() {

        console.log(this.state.orders);
        return (
            <div className="container-fluid">
                <h2 id="title">
                    Recent Orders
                </h2>
                <div className="list-group">
                    {this.renderRecentOrders()}
                </div>
            </div>

        )
    }
}

export default CustomerRecentOrders;