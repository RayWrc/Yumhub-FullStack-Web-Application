import React, {Component} from 'react';
import AdminService from "../../../Services/AdminServiceClient";
import OneOrder from "./OneOrder";

class AllOrders extends Component {
    constructor(props) {
        super(props);
        this.adminService = AdminService.instance;
        this.findAllOrders = this.findAllOrders.bind(this);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        this.findAllOrders();
    }

    findAllOrders() {
        this.adminService.findAllOrders().then((orders) => {
            console.log(orders);
            this.setState({
                              orders: orders,
                          })
        })
    }

    renderAllOrders() {
        let allOrders = null;
        if (this.state.orders.length !== 0) {
            allOrders = this.state.orders.map(
                (order) => {
                    return <OneOrder key={order.id}
                                     order={order}
                                     findAllOrders={this.findAllOrders}/>
                });
        }

        return allOrders;
    }


    render() {
        //console.log(this.state.users);
        return (
            <div className="container-fluid">
                <h2 id="title">
                    All placed orders
                </h2>
                <br/>
                <div className="accordion" id="restaurants">
                    {this.renderAllOrders()}
                </div>

            </div>

        )
    }
}

export default AllOrders;