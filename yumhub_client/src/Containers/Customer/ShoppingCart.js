import {connect} from "react-redux";
import * as actions from "../../Actions/CustomerAction";
import ShoppingCartItem from '../../Components/Restaurants/CustomerRestaurant/ShoppingCartItem'
import CustomerService from '../../Services/CustomerServiceClient'
import React, {Component} from 'react';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.customerService = CustomerService.instance;
        this.updateItemQuantity = this.updateItemQuantity.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.getTotalPrice = this.getTotalPrice.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.state = {
            totalPrice: 0,
            note: ""
        }
    }

    componentDidMount() {
        this.props.updateShoppingCart(this.props.shoppingCartId);
        if(this.props.shoppingCartItems.length !== 0){
            this.getTotalPrice();
        }
    }

    componentDidUpdate() {
        if(this.props.shoppingCartItems.length !== 0){
            this.getTotalPrice();
        }
    }

    renderShoppingCartItems() {
        let shoppingCartItems = null;
        if (this.props.shoppingCartItems != null) {
            shoppingCartItems = this.props.shoppingCartItems.map(
                (cartItem) => {
                    return <ShoppingCartItem key={cartItem.id}
                                             dishName={cartItem.dishName}
                                             dishQuantity={cartItem.quantity}
                                             dishPrice={cartItem.itemPrice}
                                             itemId={cartItem.id}
                                             updateItemQuantity={this.updateItemQuantity}
                                             removeItem={this.removeItem}/>
                });
        }
        return shoppingCartItems;
    }

    updateItemQuantity(itemId, quantity) {
        this.customerService.updateItemQuantity(itemId, quantity).then(() => {
            this.props.updateShoppingCart(this.props.shoppingCartId);
            //this.getTotalPrice();
        })
    }

    removeItem(itemId) {
        this.customerService.removeItem(itemId).then(() => {
            this.props.updateShoppingCart(this.props.shoppingCartId);
            // this.getTotalPrice();
        })

    }

    getTotalPrice() {
        this.customerService.getTotalPriceForShoppingCart(this.props.shoppingCartId)
            .then((shoppingCart) => {
                if(this.state.totalPrice !== shoppingCart.totalPrice){
                    this.setState({
                                      totalPrice: shoppingCart.totalPrice
                                  })
                }
            })
    }

    placeOrder() {
        this.customerService.placeOrder(this.props.shoppingCartId, this.state.note)
            .then(() => {
                alert("You order has been placed.");
                this.props.updateShoppingCart(this.props.shoppingCartId);

            })
    }

    render() {
       // console.log(this.props.shoppingCartItems);
        return (
            <div>
                {this.props.shoppingCartItems.length !== 0 &&
                 <div className="container-fluid">
                     <h2>Shopping Cart</h2>
                     <ul className="list-group list-group-flush">
                         {this.renderShoppingCartItems()}
                     </ul>
                     <br/>
                     <ul className="list-inline">
                         <li className="list-inline-item">
                             <h5>Total Price:</h5>
                         </li>
                         <li className="list-inline-item float-right">
                             <h5>
                                 ${this.state.totalPrice.toFixed(2)}
                             </h5>
                         </li>
                     </ul>
                     <br/>
                     <label htmlFor="note">Order Note</label>
                     <div className="input-group">
                         <input onChange={(event) => {
                             this.setState({
                                               note: event.target.value

                                           })
                         }} type="text" className="form-control" id="note"/>
                     </div>
                     <br/>
                     <button onClick={this.placeOrder} className="btn btn-primary btn-block">
                         Place Order
                     </button>
                 </div>
                }
                {this.props.shoppingCartItems.length === 0 &&
                 <div className="container-fluid">
                     <h3>
                         You Shopping Cart is empty.
                     </h3>
                 </div>
                }

            </div>

        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        shoppingCartItems: state.customer.shoppingCartItems
    }
};

const dispatcherToPropertyMapper = (dispatch) => {

    return {
        updateShoppingCart: (shoppingCartId) => actions.updateShoppingCart(dispatch, shoppingCartId)
    }
};

export const ShoppingCartContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(ShoppingCart);