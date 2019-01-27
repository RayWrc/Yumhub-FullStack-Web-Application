import React from 'react';
import DelivererOrderItemDetail from "./DelivererOrderItemDetail";

class DelivererAssignedOrderItem extends React.Component {


    orderItems() {
        let orderItems = null;
        if (this.props.orderItems.length !== 0) {
            orderItems = this.props.orderItems.map(
                (orderItem) => {
                    return <DelivererOrderItemDetail key={orderItem.id}
                                                     quantity={orderItem.quantity}
                                                     price={orderItem.itemPrice}
                                                     dishName={orderItem.dishName}/>
                });
        }

        return orderItems;
    }

    totalPrice() {
        let totalPrice = 0;
        if (this.props.orderItems.length !== 0) {
            this.props.orderItems.map(
                (orderItem) => {
                    return totalPrice = totalPrice + orderItem.itemPrice;
                });
        }

        return totalPrice;
    }

    render() {
        return (
            <li className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Customer Name: {this.props.customer.username}</h5>
                    <small>Created Time: {new Date(this.props.created).toLocaleString()}</small>
                </div>
                <br/>
                <p className="mb-1">
                    Deliverer: {this.props.deliverer.username}.
                </p>
                <p className="mb-1">
                    Order Note: {this.props.note}.
                </p>
                <p className="mb-1">
                    Order Details:
                </p>
                {this.orderItems()}
                <p className="mb-1">
                    Total Price: ${this.totalPrice().toFixed(2)}
                </p>
                <p className="mb-1">
                    Customer Address: {this.props.customer.address}
                </p>
                <p className="mb-1">
                    Order Status: {this.props.orderStatus}
                    {
                        this.props.orderStatus === "SHIPPED" &&
                        <button onClick={() => {
                            this.props.confirmDelivery(this.props.orderId)
                        }} className="btn btn-success float-right">
                            Confirm Delivery
                        </button>
                    }
                </p>
            </li>
        )

    }
}

export default DelivererAssignedOrderItem