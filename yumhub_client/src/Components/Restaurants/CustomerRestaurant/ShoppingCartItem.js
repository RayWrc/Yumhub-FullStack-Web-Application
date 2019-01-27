import React from 'react';

class ShoppingCartItem extends React.Component {

    render() {
        return (
            <li className="list-group-item">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        {this.props.dishName}
                    </li>
                    <li className="list-inline-item">
                        <select onChange={(event) => {
                            this.props.updateItemQuantity(this.props.itemId, event.target.value)
                        }}
                                className="custom-select-sm  wbdv-btn-right-margin form-control"
                                value={this.props.dishQuantity}>
                            <option value="1">Quantities: 1</option>
                            <option value="2">Quantities: 2</option>
                            <option value="3">Quantities: 3</option>
                            <option value="4">Quantities: 4</option>
                        </select>
                    </li>
                    <li className="list-inline-item">
                        ${this.props.dishPrice.toFixed(2)}
                    </li>
                    <li className="list-inline-item float-right">
                        <button onClick={() => {
                            this.props.removeItem(this.props.itemId)
                        }}
                                className="btn btn-outline-danger">
                            Remove
                        </button>
                    </li>
                </ul>
            </li>
        );

    }
}

export default ShoppingCartItem;