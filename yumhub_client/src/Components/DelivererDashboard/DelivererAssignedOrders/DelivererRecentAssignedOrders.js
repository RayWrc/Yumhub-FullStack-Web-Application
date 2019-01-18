import React, {Component} from 'react';
import UserService from "../../../Services/UserServiceClient";
import DelivererAssignedOrderItem from "./DelivererAssignedOrderItem";
import DelivererService from "../../../Services/DelivererServiceClient";

class DelivererRecentAssignedOrders extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.delivererService = DelivererService.instance;
        this.confirmDelivery = this.confirmDelivery.bind(this);
        this.state = {
            userId: 0,
            orders: [],
        };
    }

    componentDidMount() {
        this.userService.findCurrentUser().then((user) => {
            this.setState({
                              userId: user.id
                          }, () => {
                this.delivererService.findAllOrdersForDeliverer(this.state.userId)
                    .then((orders) => {
                        this.setState({
                                          orders: orders
                                      })
                    })

            })
        })
    }

    confirmDelivery(orderId) {
        this.delivererService.confirmDelivery(orderId, this.state.userId).then(() => {
            alert(
                "You have confirmed this delivery and are ready to receive another order to deliver");
            this.delivererService.findAllOrdersForDeliverer(this.state.userId)
                .then((orders) => {
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
                    return <DelivererAssignedOrderItem key={order.id}
                                                       created={order.created}
                                                       deliverer={order.deliver}
                                                       note={order.note}
                                                       orderItems={order.orderItems}
                                                       orderStatus={order.status}
                                                       orderId={order.id}
                                                       customer={order.customer}
                                                       confirmDelivery={this.confirmDelivery}/>
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
                {
                    this.state.orders.length !== 0 &&
                    <div className="list-group">
                        {this.renderRecentOrders()}
                    </div>
                }
                {
                    this.state.orders.length === 0 &&
                    <div>
                        <br/>
                        <br/>
                        <h2>
                            You are not given orders to deliver recently.
                        </h2>
                    </div>

                }
            </div>

        )
    }
}

export default DelivererRecentAssignedOrders;