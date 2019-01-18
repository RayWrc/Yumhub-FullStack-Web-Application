import React, {Component} from 'react';
import RestaurantService from "../../../Services/SearchRestaurantServiceClient";
import * as constants from "../../../Constants/Users"
import OneRestaurant from "./OneRestaurant";

class AllRestaurants extends Component {
    constructor(props) {
        super(props);
        this.restaurantService = RestaurantService.instance;
        this.findAllRestaurants = this.findAllRestaurants.bind(this);
        this.createRestaurant = this.createRestaurant.bind(this);
        this.state = {
            restaurants: [],
            name: "",
            username: ""
        };
    }

    componentDidMount() {
        this.findAllRestaurants();
    }

    findAllRestaurants() {
        this.restaurantService.findAllRestaurants().then((restaurants) => {
            console.log(restaurants);
            this.setState({
                              restaurants: restaurants,
                          })
        })
    }

    renderAllRestaurants() {
        let allRestaurants = null;
        if (this.state.restaurants.length !== 0) {
            allRestaurants = this.state.restaurants.map(
                (restaurant) => {
                    return <OneRestaurant key={restaurant.id}
                                          restaurant={restaurant}
                                          findAllRestaurants={this.findAllRestaurants}/>
                });
        }

        return allRestaurants;
    }

    createRestaurant() {
        let restaurant = {
            name: this.state.name
        };
        this.restaurantService.createRestaurantForOwner(restaurant, this.state.username).then(() => {
            this.findAllRestaurants();
        })
    }

    render() {
        //console.log(this.state.users);
        return (
            <div className="container-fluid">
                <h2 id="title">
                    All Restaurants
                </h2>
                <br/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <input onChange={(event) => {
                                this.setState({
                                                  name: event.target.value
                                              })
                            }}
                                   className="form-control"
                                   placeholder="Restaurant name"/>
                        </th>
                        <th>
                            <input onChange={(event) => {
                                this.setState({
                                                  username: event.target.value
                                              })
                            }}
                                   className="form-control"
                                   placeholder="Assign one owner to this restaurant" type="text"/>
                        </th>
                        <th/>
                        <th>
                            <button onClick={this.createRestaurant}
                                    className="btn btn-info">
                                Add
                            </button>
                        </th>

                    </tr>
                    </thead>
                </table>
                <div className="accordion" id="restaurants">
                    {this.renderAllRestaurants()}
                </div>

            </div>

        )
    }
}

export default AllRestaurants;