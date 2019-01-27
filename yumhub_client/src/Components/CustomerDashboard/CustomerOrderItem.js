import React from 'react';
import OrderItemDetail from "./OrderItemDetail";

class CustomerOrderItem extends React.Component {
    constructor(props) {
        super(props);
        this.writeReview = this.writeReview.bind(this);
        this.state = {
            restaurantRating: 5,
            delivererRating: 5,
            text: ""
        }

    }

    orderItems() {
        let orderItems = null;
        if (this.props.orderItems.length !== 0) {
            orderItems = this.props.orderItems.map(
                (orderItem) => {
                    return <OrderItemDetail key={orderItem.id}
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

    writeReview() {
        let review = {
            restaurantRating: this.state.restaurantRating,
            delivererRating: this.state.delivererRating,
            text: this.state.text

        };
        this.props.writeReview(review, this.props.orderId);
    }

    updateReview() {
        let review = {
            restaurantRating: this.state.restaurantRating,
            delivererRating: this.state.delivererRating,
            text: this.state.text

        };
        this.props.updateReview(review, this.props.orderId);
    }

    render() {
        //console.log(this.state);
        return (
            <li className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Restaurant Name: {this.props.restaurant.name}</h5>
                    <small>Created Time: {new Date(this.props.created).toLocaleString()}</small>
                </div>
                <br/>
                {this.props.deliverer === null &&
                 <p className="mb-1">
                     Deliverer: Not yet assigned.
                 </p>
                }
                {this.props.deliverer !== null &&
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
                </p>
                {this.props.orderReview === null && this.props.orderStatus === "DELIVERED" &&
                 <div>
                     <p className="mb-1">
                         Restaurant Rating:
                         <select onChange={(event) => {
                             this.setState({restaurantRating: Number(event.target.value)})
                         }}
                                 id="userType" className="form-control">
                             <option value={5}>5: Very Good!</option>
                             <option value={4}>4: Good</option>
                             <option value={3}>3: Fair</option>
                             <option value={2}>2: Bad</option>
                             <option value={1}>1: Very Bad</option>
                         </select>
                     </p>
                     <p className="mb-1">
                         Deliverer Rating:
                         <select onChange={(event) => {
                             this.setState({delivererRating: Number(event.target.value)})
                         }}
                                 id="userType" className="form-control">
                             <option value={5}>5: Very Good!</option>
                             <option value={4}>4: Good</option>
                             <option value={3}>3: Fair</option>
                             <option value={2}>2: Bad</option>
                             <option value={1}>1: Very Bad</option>
                         </select>
                     </p>
                     <p className="mb-1">
                         Comment on this order:
                         <input onChange={(event) => {
                             this.setState({
                                               text: event.target.value

                                           })
                         }} type="text" className="form-control"/>
                     </p>
                     <button onClick={() => {
                         this.writeReview()
                     }} className="btn btn-info float-right">
                         Write Review
                     </button>
                 </div>
                }

                {this.props.orderReview !== null && this.props.orderStatus === "DELIVERED" &&
                 <div>
                     <p className="mb-1">
                         Restaurant Rating:
                         <select onChange={(event) => {
                             this.setState({restaurantRating: Number(event.target.value)})
                         }}
                                 id="userType" className="form-control"
                                 defaultValue={this.props.orderReview.restaurantRating.toString()}>
                             <option value={5}>5: Very Good!</option>
                             <option value={4}>4: Good</option>
                             <option value={3}>3: Fair</option>
                             <option value={2}>2: Bad</option>
                             <option value={1}>1: Very Bad</option>
                         </select>
                     </p>
                     <p className="mb-1">
                         Deliverer Rating:
                         <select onChange={(event) => {
                             this.setState({delivererRating: Number(event.target.value)})
                         }}
                                 id="userType" className="form-control"
                                 defaultValue={this.props.orderReview.delivererRating.toString()}>
                             <option value={5}>5: Very Good!</option>
                             <option value={4}>4: Good</option>
                             <option value={3}>3: Fair</option>
                             <option value={2}>2: Bad</option>
                             <option value={1}>1: Very Bad</option>
                         </select>
                     </p>
                     <p className="mb-1">
                         Comment on this order:
                         <input defaultValue={this.props.orderReview.text} onChange={(event) => {
                             this.setState({
                                               text: event.target.value

                                           })
                         }} type="text" className="form-control"/>
                     </p>
                     <p className="mb-1">
                         Restaurant's reply:
                         <input
                             defaultValue={this.props.orderReview.reply} type="text"
                             className="form-control" disabled="disabled"/>
                     </p>
                     <button onClick={() => {
                         this.updateReview()
                     }} className="btn btn-info float-right">
                         Update Review
                     </button>
                 </div>
                }
            </li>
        )

    }
}

export default CustomerOrderItem