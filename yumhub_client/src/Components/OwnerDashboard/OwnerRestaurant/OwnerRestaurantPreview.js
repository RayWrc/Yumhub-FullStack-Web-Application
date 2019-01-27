import React from 'react';
import UserService from "../../../Services/UserServiceClient";
import OwnerService from "../../../Services/OwnerServiceClient";
import SearchRestaurantService from "../../../Services/SearchRestaurantServiceClient";
import OwnerMenu from "../../Restaurants/OwnerRestaurant/OwnerMenu";
import {Carousel} from "react-responsive-carousel";

class OwnerRestaurantPreview extends React.Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.ownerService = OwnerService.instance;
        this.searchRestaurantService = SearchRestaurantService.instance;
        this.renderRestaurantMenu = this.renderRestaurantMenu.bind(this);
        this.state = {
            userId: 0,
            restaurant: {},
            restaurantMenu: [],
            ready: false
        };

    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then((user) => {
                return this.setState({
                                         userId: user.id
                                     }, () => {
                    this.ownerService.findRestaurantForOwner(this.state.userId).then((res) => {
                        return this.setState({
                                                 restaurant: res
                                             }, () => {
                            if (this.state.restaurant !== null) {
                                this.searchRestaurantService.findRestaurantMenuById(
                                    this.state.restaurant.id)
                                    .then((menu) => {
                                        this.setState({
                                                          restaurantMenu: menu,
                                                          ready: true
                                                      })
                                    })
                            }
                        })
                    })

                });

            })

    }

    renderRestaurantMenu() {
        let restaurantMenu = null;
        if (this.state.restaurantMenu.length !== 0) {
            restaurantMenu = this.state.restaurantMenu.map(
                (menu) => {
                    return <OwnerMenu key={menu.id}
                                      name={menu.name}
                                      price={menu.price}
                                      description={menu.description}/>
                });
        }

        return restaurantMenu;

    }

    render() {
        if (this.state.restaurant === null) {
            return (<div>
                <br/>
                <br/>
                <h2>
                    You need to create your own restaurant first.
                </h2>
            </div>)
        } else {
            return (
                <div className="container-fluid">
                    <h2>Restaurant outLook</h2>
                    <div className="card bg-light mb-3">
                        <img className="card-img-top" src={this.state.restaurant.photoLink} alt=""/>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.restaurant.name}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Cuisine
                                Type: {this.state.restaurant.cuisineType}</li>
                            <li className="list-group-item">Rating: {this.state.restaurant.rating}</li>
                            <li className="list-group-item">Price: {this.state.restaurant.price}</li>
                            <li className="list-group-item">
                                Address: {this.state.restaurant.address}, {this.state.restaurant.city}, {this.state.restaurant.state}
                            </li>
                        </ul>

                    </div>
                    <h2>Restaurant Detail</h2>
                    <div className="jumbotron">
                        <h1 className="display-4">{this.state.restaurant.name}</h1>
                        <hr className="my-4"/>
                        <li>Cuisine: {this.state.restaurant.cuisineType}</li>
                        <li>Rating: {this.state.restaurant.rating}</li>
                        <li>Price: {this.state.restaurant.price}</li>
                        <li>Phone: {this.state.restaurant.phone}</li>
                        <li>Address: {this.state.restaurant.address}, {this.state.restaurant.city}, {this.state.restaurant.state}</li>
                        <br/>
                        <h1>Restaurant Pictures</h1>
                        <hr className="my-4"/>
                        {
                            this.state.ready === true &&
                            <div className="row justify-content-center">
                                <Carousel className="w-50 h-50" dynamicHeight={true}
                                          showArrows={true} showThumbs={true}>
                                    {
                                        this.state.restaurant.descriptionPictures.map((pic) => (
                                            <div key={pic.id}>
                                                <img src={pic.link} alt=""/>
                                            </div>
                                        ))
                                    }

                                </Carousel>
                            </div>
                        }
                        <br/>
                        <h1>Restaurant Menu</h1>
                        <hr className="my-4"/>
                        <div className="list-group">
                            {this.renderRestaurantMenu()}
                        </div>
                    </div>

                </div>
            )

        }
    }
}

export default OwnerRestaurantPreview