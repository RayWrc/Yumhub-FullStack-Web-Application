import React from 'react';

class OrderItemDetail extends React.Component {


    render() {
        return (

                <p className="mb-1">
                    Quantity: {this.props.quantity} | Dish name: {this.props.dishName} | Price: ${this.props.price}
                </p>

        )

    }
}

export default OrderItemDetail