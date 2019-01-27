import React from 'react';

class OwnerMenu extends React.Component {

    render() {
        return (
            <li className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.props.name}</h5>
                </div>
                <p className="mb-1">
                    {this.props.description}
                </p>
                <p className="mb-1">Price: ${this.props.price}</p>
            </li>
        )

    }
}

export default OwnerMenu