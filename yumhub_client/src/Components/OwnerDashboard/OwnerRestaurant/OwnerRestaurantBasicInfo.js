import React, {Component} from 'react';
import OwnerService from "../../../Services/OwnerServiceClient";
import UserService from "../../../Services/UserServiceClient";

class OwnerRestaurantBasicInfo extends Component {
    constructor(props) {
        super(props);
        this.ownerService = OwnerService.instance;
        this.userService = UserService.instance;
        this.infoUpdate = this.infoUpdate.bind(this);
        this.createRestaurant = this.createRestaurant.bind(this);
        this.state = {
            userId: 0,
            restaurantId: 0,
            restaurant: {},
            restaurantName: "",
            restaurantAddress: "",
            restaurantCuisine: "",
            restaurantRating: 5,
            restaurantRatingAmount: 0,
            restaurantCity: "",
            restaurantState: "",
            restaurantPhone: "",
            restaurantPrice: "",
            coverPhoto: ""
        };
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then((user) => {
                return this.setState({
                                         userId: user.id
                                     })
            })
            .then(() => {
                this.ownerService.findRestaurantForOwner(this.state.userId).then((restaurant) => {
                    if (restaurant !== null) {
                        this.setState({
                                          restaurantId: restaurant.id,
                                          restaurant: restaurant,
                                          restaurantName: restaurant.name,
                                          restaurantAddress: restaurant.address,
                                          restaurantCity: restaurant.city,
                                          restaurantState: restaurant.state,
                                          restaurantPhone: restaurant.phone,
                                          restaurantCuisine: restaurant.cuisineType,
                                          restaurantRating: restaurant.rating,
                                          restaurantRatingAmount: restaurant.ratingAmount,
                                          restaurantPrice: restaurant.price,
                                          coverPhoto: restaurant.photoLink
                                      })
                    } else {
                        this.setState({
                                          restaurant: null
                                      })
                    }
                })
            })
    }

    infoUpdate() {
        let restaurant = {
            id: this.state.restaurantId,
            name: this.state.restaurantName,
            cuisineType: this.state.restaurantCuisine,
            photoLink: this.state.coverPhoto,
            phone: this.state.restaurantPhone,
            address: this.state.restaurantAddress,
            city: this.state.restaurantCity,
            state: this.state.restaurantState,
            price: this.state.restaurantPrice
        };
        //console.log(restaurant);
        this.ownerService.restaurantInfoUpdate(restaurant).then(() => {
            alert("Restaurant Information has been updated")
        })

    }

    createRestaurant() {
        let restaurant = {
            name: this.state.restaurantName,
            cuisineType: this.state.restaurantCuisine,
            photoLink: this.state.coverPhoto,
            phone: this.state.restaurantPhone,
            address: this.state.restaurantAddress,
            city: this.state.restaurantCity,
            state: this.state.restaurantState,
            price: this.state.restaurantPrice
        };
        //console.log(restaurant);
        this.ownerService.createRestaurant(restaurant, this.state.userId).then(() => {
            alert("Restaurant has been created");
            this.ownerService.findRestaurantForOwner(this.state.userId).then((restaurant) => {
                if (restaurant !== null) {
                    this.setState({
                                      restaurantId: restaurant.id,
                                      restaurant: restaurant,
                                      restaurantName: restaurant.name,
                                      restaurantAddress: restaurant.address,
                                      restaurantCity: restaurant.city,
                                      restaurantState: restaurant.state,
                                      restaurantPhone: restaurant.phone,
                                      restaurantCuisine: restaurant.cuisineType,
                                      restaurantRating: restaurant.rating,
                                      restaurantRatingAmount: restaurant.ratingAmount,
                                      restaurantPrice: restaurant.price,
                                      coverPhoto: restaurant.photoLink
                                  })
                } else {
                    this.setState({
                                      restaurant: null
                                  })
                }
            })

        })
    }

    render() {
        //console.log(this.state);
        return (
            <div className="container-fluid">
                <h2 id="title">
                    Restaurant Basic Information
                </h2>

                <form>
                    <div className="form-group row">
                        <label htmlFor="restaurantName"
                               className="col-sm-2 col-form-label">Restaurant Name</label>
                        <div className="col-sm-10">
                            <input
                                onChange={(event) => this.setState(
                                    {restaurantName: event.target.value})}
                                defaultValue={this.state.restaurantName} type="text"
                                className="form-control"
                                id="restaurantName"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="restaurantCuisine"
                               className="col-sm-2 col-form-label">Cuisine</label>
                        <div className="col-sm-10">
                            <input onChange={(event) => this.setState(
                                {restaurantCuisine: event.target.value})}
                                   defaultValue={this.state.restaurantCuisine} type="text"
                                   className="form-control"
                                   id="restaurantCuisine"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="restaurantPrice" className="col-sm-2 col-form-label">
                            Restaurant Price
                        </label>
                        <div className="col-sm-10">
                            <input onChange={(event) =>
                                this.setState({restaurantPrice: event.target.value})}
                                   defaultValue={this.state.restaurantPrice} type="text"
                                   className="form-control"
                                   id="restaurantPrice" placeholder="$$$$"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="coverPhoto" className="col-sm-2 col-form-label">
                            Cover Photo</label>
                        <div className="col-sm-10">
                            <input onChange={(event) => this.setState(
                                {coverPhoto: event.target.value})}
                                   defaultValue={this.state.coverPhoto} type="text"
                                   className="form-control"
                                   id="coverPhoto"
                                   placeholder="Please Provide the link to that photo"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="restaurantRating"
                               className="col-sm-2 col-form-label">Restaurant Rating</label>
                        <div className="col-sm-10">
                            <input
                                value={this.state.restaurantRating} type="text"
                                className="form-control"
                                id="restaurantRating" disabled="disabled"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="restaurantRatingAmount"
                               className="col-sm-2 col-form-label">Received Rating Amount</label>
                        <div className="col-sm-10">
                            <input
                                value={this.state.restaurantRatingAmount} type="text"
                                className="form-control"
                                id="restaurantRatingAmount" disabled="disabled"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="restaurantPhone"
                               className="col-sm-2 col-form-label">Restaurant Phone</label>
                        <div className="col-sm-10">
                            <input
                                onChange={(event) => this.setState(
                                    {restaurantPhone: event.target.value})}
                                defaultValue={this.state.restaurantPhone} type="text"
                                className="form-control"
                                id="restaurantPhone"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="restaurantAddress"
                               className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                            <input
                                onChange={(event) => this.setState(
                                    {restaurantAddress: event.target.value})}
                                defaultValue={this.state.restaurantAddress} type="text"
                                className="form-control"
                                id="restaurantAddress"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="restaurantCity"
                               className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-10">
                            <input
                                onChange={(event) => this.setState(
                                    {restaurantCity: event.target.value})}
                                defaultValue={this.state.restaurantCity} type="text"
                                className="form-control"
                                id="restaurantCity"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="restaurantState"
                               className="col-sm-2 col-form-label">State</label>
                        <div className="col-sm-10">
                            <input
                                onChange={(event) => this.setState(
                                    {restaurantState: event.target.value})}
                                defaultValue={this.state.restaurantState} type="text"
                                className="form-control"
                                id="restaurantState"/>
                        </div>
                    </div>
                </form>
                {this.state.restaurant !== null && <div className="float-right">
                    <button onClick={this.infoUpdate} className="btn btn-primary btn-info">
                        Update Info
                    </button>
                </div>
                }
                {
                    this.state.restaurant === null &&
                    <div className="float-right">
                        <button onClick={this.createRestaurant}
                                className="btn btn-primary btn-success">
                            Create Restaurant
                        </button>
                    </div>
                }


            </div>

        )
    }
}

export default OwnerRestaurantBasicInfo;