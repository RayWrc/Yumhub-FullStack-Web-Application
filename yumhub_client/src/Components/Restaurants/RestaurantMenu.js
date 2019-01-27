import React from 'react';

class RestaurantMenu extends React.Component {

    render() {
        return (
            <li className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.props.name}</h5>
                </div>
                <button onClick={() => {
                    this.props.addDish(this.props.Id, this.props.customerId)
                }} className="btn btn-info float-right">
                    Add to shopping cart
                </button>
                <p className="mb-1">
                    {this.props.description}
                </p>
                <p className="mb-1">Price: ${this.props.price}</p>
            </li>
        )

    }
}

export default RestaurantMenu