import React from 'react';
import OwnerOrderItemDetail from "./OwnerOrderItemDetail";

class OwnerOrderItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reply: ""
        }

    }

    orderItems() {
        let orderItems = null;
        if (this.props.orderItems.length !== 0) {
            orderItems = this.props.orderItems.map(
                (orderItem) => {
                    return <OwnerOrderItemDetail key={orderItem.id}
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

    writeReply() {
        this.props.writeReplyForReview(this.state.reply, this.props.orderReview.id);
    }

    updateReply() {
        this.props.updateReplyForReview(this.state.reply, this.props.orderReview.id);
    }

    render() {
        return (
            <li className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Customer Name: {this.props.customer.username}</h5>
                    <small>Created Time: {new Date(this.props.created).toLocaleString()}</small>
                </div>
                <br/>
                {
                    this.props.deliverer === null &&
                    <p className="mb-1">
                        Deliverer: Not yet assigned.
                    </p>
                }
                {
                    this.props.deliverer !== null &&
                    <p className="mb-1">
                        Deliverer: {this.props.deliverer.username}.
                    </p>
                }
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
                    Customer Address: {this.props.address}
                </p>
                <p className="mb-1">
                    Order Status: {this.props.orderStatus}
                    {
                        this.props.orderStatus === "NEW" &&
                        <button onClick={() => {
                            this.props.acceptOrder(this.props.orderId)
                        }} className="btn btn-info float-right">
                            Accept this order
                        </button>
                    }
                </p>
                {
                    this.props.orderStatus === "HOLD" &&
                    <div>
                        <br/>
                        <h5 className="mb-1">Select a Deliverer: </h5>
                        <ul className="list-group">
                            {
                                this.props.allDeliverers.map((deliver) => (
                                    <li key={deliver.id}
                                        className="list-group-item d-flex justify-content-between align-items-center">
                                        {deliver.username}
                                        <span>Rating: {deliver.rating}</span>
                                        <span>Rating Amount: {deliver.ratingAmount}</span>
                                        {
                                            deliver.isFree === true &&
                                            <span>Free</span>
                                        }
                                        {
                                            deliver.isFree === false &&
                                            <span>Occupied</span>
                                        }
                                        {
                                            deliver.isFree === true &&
                                            <span>
                                             <button onClick={() => {
                                                 this.props.chooseDeliverer(deliver.id,
                                                                            this.props.orderId)
                                             }} className="btn-sm btn-outline-success float-right">
                                                 Choose
                                             </button>
                                         </span>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }

                {
                    this.props.orderReview !== null && this.props.orderStatus === "DELIVERED" &&
                    <div>
                        <p className="mb-1">
                            Rating
                            from {this.props.customer.username}: {this.props.orderReview.restaurantRating}
                        </p>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{this.props.customer.username}'s comment on this
                                order:</h5>
                        </div>
                        <p className="mb-1">
                            <input value={this.props.orderReview.text} type="text"
                                   className="form-control"
                                   disabled="disabled"/>
                        </p>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Reply to {this.props.customer.username}'s
                                comment</h5>
                        </div>
                        <p className="mb-1">
                            <input onChange={(event) => {
                                this.setState({
                                                  reply: event.target.value
                                              })
                            }}
                                   defaultValue={this.props.orderReview.reply} type="text"
                                   className="form-control"/>
                        </p>
                        {
                            this.props.orderReview.reply === null &&
                            <button onClick={() => {
                                this.writeReply()
                            }} className="btn btn-info float-right">
                                Write reply
                            </button>
                        }
                        {
                            this.props.orderReview.reply !== null &&
                            <button onClick={() => {
                                this.updateReply()
                            }} className="btn btn-info float-right">
                                Update reply
                            </button>
                        }
                    </div>
                }
            </li>
        )

    }
}

export default OwnerOrderItem