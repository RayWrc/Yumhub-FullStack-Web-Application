import React, {Component} from 'react';
import SearchRestaurantService from '../../Services/SearchRestaurantServiceClient';
import CustomerService from '../../Services/CustomerServiceClient';
import RestaurantMenu from '../../Components/Restaurants/RestaurantMenu';
import {Carousel} from 'react-responsive-carousel';
import {connect} from "react-redux";
import * as actions from "../../Actions/UserAction";
import * as customerActions from "../../Actions/CustomerAction";
import * as constants from "../../Constants/Users";
import {HeadingSearchingContainer} from "../HeadingSearching";
import {ShoppingCartContainer} from "../Customer/ShoppingCart";

class RestaurantDetail extends Component {
    constructor(props) {
        super(props);
        this.yelpId = this.props.match.params.yelpId;
        this.searchRestaurantService = SearchRestaurantService.instance;
        this.customerService = CustomerService.instance;
        this.findRestaurantByYelpId = this.findRestaurantByYelpId.bind(this);
        this.findRestaurantMenuById = this.findRestaurantMenuById.bind(this);
        this.addDish = this.addDish.bind(this);

        this.state = {
            yelpId: this.yelpId,
            restaurant: null,
            restaurantMenu: []
        };
    }

    componentDidMount() {
        this.findRestaurantByYelpId(this.state.yelpId);
        this.findRestaurantMenuById(this.state.yelpId);
        this.props.findUser();
    }

    /*componentDidUpdate(prevProps) {
        if (this.props.match.params.yelpId !== prevProps.match.params.yelpId) {
            this.setState({
                              yelpId: this.props.match.params.yelpId
                          })
        }
    }*/

    renderRestaurantMenu() {
        let restaurantMenu = null;
        if (this.state.restaurantMenu != null) {
            restaurantMenu = this.state.restaurantMenu.map(
                (menu) => {
                    return <RestaurantMenu key={menu.id}
                                           name={menu.name}
                                           price={menu.price}
                                           description={menu.description}
                                           addDish={this.addDish}
                                           Id={menu.id}
                                           customerId={this.props.currentUser.id}/>
                });
        }

        return restaurantMenu;

    }

    findRestaurantByYelpId(yelpId) {
        this.searchRestaurantService.findRestaurantDetailByYelpId(yelpId)
            .then((restaurant) => {
                this.setState({
                                  restaurant: restaurant
                              })
            })

    }

    findRestaurantMenuById(Id) {
        this.searchRestaurantService.findRestaurantMenuById(Id)
            .then((menu) => {
                this.setState({
                                  restaurantMenu: menu
                              })
            })

    }

    addDish(dishId, shoppingCartId) {
        if (this.props.userType === constants.ANONYMOUS_USER) {
            alert('You have to login first');
        }
        if (this.props.userType === constants.CUSTOMER_USER) {
            this.customerService.addDishToShoppingCart(dishId, shoppingCartId)
                .then((value) => {
                    if (value === null) {
                        alert('You have already added this dish');
                    } else {
                        this.props.updateShoppingCart(shoppingCartId);
                    }
                });
        }

    }

    render() {
        console.log(this.state.restaurant);
        if (this.state.restaurant !== null) {
            return (
                <div className="container-fluid">
                    <HeadingSearchingContainer props={this.props}/>
                    <br/>
                    {
                        this.props.userType === constants.ANONYMOUS_USER
                        &&
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
                            <br/>
                            <h1>Restaurant Menu</h1>
                            <hr className="my-4"/>
                            <div className="list-group">
                                {this.renderRestaurantMenu()}
                            </div>
                        </div>
                    }

                    {
                        this.props.userType === constants.CUSTOMER_USER
                        &&
                        <div className="row">
                            <div className="jumbotron col-sm-7">
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
                                <br/>
                                <h1>Restaurant Menu</h1>
                                <hr className="my-4"/>
                                <div className="list-group">
                                    {this.renderRestaurantMenu()}
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <ShoppingCartContainer shoppingCartId={this.props.currentUser.id}/>
                            </div>
                        </div>
                    }
                </div>

            )
        }
        return null;
    }
}

const stateToPropertyMapper = (state) => {
    return {
        userType: state.users.userType,
        currentUser: state.users.currentUser

    }
};

const dispatcherToPropertyMapper = (dispatch) => {

    return {
        findUser: () => actions.findUser(dispatch),
        updateShoppingCart: (shoppingCartId) => customerActions.updateShoppingCart(dispatch,
                                                                                   shoppingCartId)
    }
};

export const RestaurantDetailContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(RestaurantDetail);

//export default RestaurantDetail;