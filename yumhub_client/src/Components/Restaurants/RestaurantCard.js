import React from 'react';

class RestaurantCard extends React.Component {
    constructor(props) {
        super(props);
        this.findDetailsByRestaurantId = this.findDetailsByRestaurantId.bind(this);

    }

    findDetailsByRestaurantId() {
        this.props.selectRestaurant(this.props.res.id);
    }

    render() {
        return (
            <div className="col-sm-3">
                <div className="card bg-light mb-3">
                    <img className="card-img-top" src={this.props.res.photoLink} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.res.name}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cuisine
                            Type: {this.props.res.cuisineType}</li>
                        <li className="list-group-item">Rating: {this.props.res.rating}</li>
                        <li className="list-group-item">Price: {this.props.res.price}</li>
                        <li className="list-group-item">
                            Address: {this.props.res.address}, {this.props.res.city}, {this.props.res.state}
                        </li>
                        <li className="list-group-item">
                            Distance: {Math.round(this.props.res.distance)} m
                        </li>
                    </ul>
                    <div className="card-body">
                        <button onClick={this.findDetailsByRestaurantId} className="btn btn-info">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        )

    }
}

export default RestaurantCard