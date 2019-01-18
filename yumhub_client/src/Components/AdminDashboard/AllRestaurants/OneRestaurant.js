import React from 'react';
import RestaurantService from "../../../Services/SearchRestaurantServiceClient"

class OneRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.resService = RestaurantService.instance;
        this.changeState = this.changeState.bind(this);
        this.updateRestaurant = this.updateRestaurant.bind(this);
        this.deleteRestaurant = this.deleteRestaurant.bind(this);

        this.state = {
            owner: {},
            rating: 0,
            ratingAmount: 0,
            status: "collapse",
            showId: 1
        }
    }

    componentDidMount() {
        this.resService.findOwnerForRestaurant(this.props.restaurant.id).then((owner) => {
            this.setState({
                              owner: owner
                          })
        })
    }

    changeState() {
        if (this.state.showId === 1) {
            this.setState({
                              status: "collapse show",
                              showId: 2
                          })
        }
        if (this.state.showId === 2) {
            this.setState({
                              status: "collapse",
                              showId: 1
                          })
        }
    }

    updateRestaurant() {
        let restaurant = {
            rating: this.state.rating,
            ratingAmount: this.state.ratingAmount
        };
        this.resService.adminUpdateRes(restaurant, this.props.restaurant.id).then(() => {
            alert("This restaurant has been updated");
            this.props.findAllRestaurants();
        })

    }

    deleteRestaurant(resId) {

        this.resService.deleteRestaurantById(resId).then(() => {
            alert("This restaurant has been deleted");
            this.props.findAllRestaurants();
        })
    }

    render() {

        return (
            <div className="card">
                <div className="card-header" id={this.props.restaurant.id}>
                    <ul className="list-inline row">
                        <li className="list-inline-item col-sm-5">
                            <h5 className="mb-0">
                                <button onClick={() => {
                                    this.changeState()
                                }} className="btn btn-link" type="button" data-toggle="collapse"
                                        data-target={"#" + this.props.restaurant.id.toString()}
                                        aria-expanded="true"
                                        aria-controls={this.props.restaurant.id.toString()}>
                                    {this.props.restaurant.name}
                                </button>
                            </h5>
                        </li>
                        <li className="list-inline-item col-sm-5">
                            Owner: {this.state.owner.username}
                        </li>
                        <li className="list-inline-item col-sm-1">
                            <button onClick={() => {
                                this.deleteRestaurant(this.props.restaurant.id)
                            }}
                                    className="btn btn-outline-danger">
                                Remove
                            </button>
                        </li>
                    </ul>
                </div>

                <div id={this.props.restaurant.id.toString()} className={this.state.status}
                     aria-labelledby={this.props.restaurant.id}
                     data-parent="#users">
                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="rating"
                                       className="col-sm-2 col-form-label">
                                    Restaurant Rating
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        onChange={(event) => this.setState(
                                            {rating: Number(event.target.value)})}
                                        defaultValue={this.props.restaurant.rating} type="text"
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="rating"
                                       className="col-sm-2 col-form-label">
                                    Restaurant Rating
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        onChange={(event) => this.setState(
                                            {ratingAmount: Number(event.target.value)})}
                                        defaultValue={this.props.restaurant.ratingAmount}
                                        type="text"
                                        className="form-control"/>
                                </div>
                            </div>

                        </form>
                        <div className="float-right">
                            <button onClick={() => {
                                this.updateRestaurant()
                            }}
                                    className="btn btn-primary btn-info">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default OneRestaurant