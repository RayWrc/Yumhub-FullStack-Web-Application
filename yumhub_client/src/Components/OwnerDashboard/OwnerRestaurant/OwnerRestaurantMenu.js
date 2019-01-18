import React, {Component} from 'react';
import UserService from "../../../Services/UserServiceClient";
import SearchRestaurantService from "../../../Services/SearchRestaurantServiceClient";
import MenuItem from "./MenuItem";
import OwnerService from "../../../Services/OwnerServiceClient";

class OwnerRestaurantMenu extends Component {
    constructor(props) {
        super(props);
        this.searchRestaurantService = SearchRestaurantService.instance;
        this.userService = UserService.instance;
        this.ownerService = OwnerService.instance;
        this.addDish = this.addDish.bind(this);
        this.deleteDish = this.deleteDish.bind(this);
        this.updateDish = this.updateDish.bind(this);
        this.state = {
            restaurant: {},
            dishes: [],
            dishName: "",
            dishDescription: "",
            dishPrice: 0,
        };
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then((user) => {
                console.log(user);
                return this.setState({
                                         restaurant: user.restaurant
                                     })
            }).then(() => {
                if(this.state.restaurant !== null){
                    this.searchRestaurantService.findRestaurantMenuById(this.state.restaurant.id)
                        .then((dishes) => {
                            this.setState({
                                              dishes: dishes
                                          })
                        })
                }
        })
    }

    addDish() {
        let dish = {
            name: this.state.dishName,
            description: this.state.dishDescription,
            price: this.state.dishPrice
        };
        //console.log(restaurant);
        this.ownerService.addDishForRestaurant(dish, this.state.restaurant.id).then(() => {
            this.searchRestaurantService.findRestaurantMenuById(this.state.restaurant.id)
                .then((dishes) => {
                    this.setState({
                                      dishes: dishes
                                  })
                })
        })

    }

    deleteDish(dishId) {
       this.ownerService.deleteDishForRestaurant(dishId).then(() => {
           this.searchRestaurantService.findRestaurantMenuById(this.state.restaurant.id)
               .then((dishes) => {
                   this.setState({
                                     dishes: dishes
                                 })
               })
       })

    }



    updateDish(dish, dishId){
        this.ownerService.updateDish(dish, dishId).then(()=>{
            alert("This dish has been updated");
            this.searchRestaurantService.findRestaurantMenuById(this.state.restaurant.id)
                .then((dishes) => {
                    this.setState({
                                      dishes: dishes
                                  })
                })
        })
    }

    renderMenu() {
        let dishes = null;
        if (this.state.dishes !== null) {
            dishes = this.state.dishes.map(
                (dish) => {
                    return <MenuItem key={dish.id}
                                     description={dish.description}
                                     name={dish.name}
                                     price={dish.price}
                                     dishId={dish.id}
                                     deleteDish={this.deleteDish}
                                     updateDish={this.updateDish}/>
                }
            )
        }
        return dishes;
    }

    render() {
       // console.log(this.state.dishes);
        return (
            <div className="container-fluid">
                <h2 id="title">
                    Restaurant Menu
                </h2>
                <br/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <input onChange={(event) => {
                                this.setState({
                                                  dishName: event.target.value
                                              })
                            }}
                                   className="form-control"
                                   placeholder="New Dish name"/>
                        </th>
                        <th>
                            <input onChange={(event) => {
                                this.setState({
                                                  dishDescription: event.target.value
                                              })
                            }}
                                   className="form-control"
                                   placeholder="Dish description"/>
                        </th>
                        <th>
                            <input onChange={(event) => {
                                this.setState({
                                                  dishPrice: event.target.value
                                              })
                            }}
                                   className="form-control"
                                   placeholder="Dish Prcie"/>
                        </th>
                        <th/>
                        <th>
                            <button onClick={this.addDish}
                                    className="btn btn-info">
                                Add
                            </button>
                        </th>

                    </tr>

                    <tr className="thead-light">
                        <th>Dish Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderMenu()}
                    </tbody>

                </table>


            </div>

        )
    }
}

export default OwnerRestaurantMenu;