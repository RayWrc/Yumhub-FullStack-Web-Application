import React from 'react';
import AdminService from "../../../Services/AdminServiceClient"
import * as constants from "../../../Constants/Order";

class OneRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.adminService = AdminService.instance;
        this.changeState = this.changeState.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);

        this.state = {
            note: this.props.order.note,
            orderStatus: this.props.order.status,
            status: "collapse",
            showId: 1
        }
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

    updateOrder() {

        this.adminService.adminUpdateOrder(this.state.note, this.props.order.id,
                                           this.state.orderStatus).then(() => {
            alert("This order has been updated");
            this.props.findAllOrders();
        })

    }

    deleteOrder(orderId) {

        this.adminService.deleteOrderById(orderId).then(() => {
            alert("This order has been deleted");
            this.props.findAllOrders();
        })
    }

    render() {

        return (
            <div className="card">
                <div className="card-header" id={this.props.order.id}>
                    <ul className="list-inline row">
                        <li className="list-inline-item col-sm-3">
                            <h5 className="mb-0">
                                <button onClick={() => {
                                    this.changeState()
                                }} className="btn btn-link" type="button" data-toggle="collapse"
                                        data-target={"#" + this.props.order.id.toString()}
                                        aria-expanded="true"
                                        aria-controls={this.props.order.id.toString()}>
                                    Ordered by: {this.props.order.customer.username}
                                </button>
                            </h5>
                        </li>
                        <li className="list-inline-item col-sm-3">
                            Restaurant: {this.props.order.restaurant.name}
                        </li>
                        <li className="list-inline-item col-sm-4">
                            Created: {new Date(this.props.order.created).toLocaleString()}
                        </li>
                        <li className="list-inline-item col-sm-1">
                            <button onClick={() => {
                                this.deleteOrder(this.props.order.id)
                            }}
                                    className="btn btn-outline-danger">
                                Remove
                            </button>
                        </li>
                    </ul>
                </div>

                <div id={this.props.order.id.toString()} className={this.state.status}
                     aria-labelledby={this.props.order.id}
                     data-parent="#users">
                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="rating"
                                       className="col-sm-2 col-form-label">
                                    Customer's note:
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        onChange={(event) => this.setState(
                                            {note: event.target.value})}
                                        defaultValue={this.props.order.note} type="text"
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="rating"
                                       className="col-sm-2 col-form-label">
                                    Order Status:
                                </label>
                                <div className="col-sm-10">
                                    <select onChange={(event) => {
                                        this.setState({
                                                          orderStatus: event.target.value
                                                      })
                                    }}
                                            className="custom-select-sm  wbdv-btn-right-margin form-control"
                                            id="userType" defaultValue={this.props.order.status}>
                                        <option value={constants.NEW}>New</option>
                                        <option value={constants.HOLD}>Hold</option>
                                        <option value={constants.SHIPPED}>Shipped</option>
                                        <option value={constants.DELIVERED}>Delivered</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div className="float-right">
                            <button onClick={() => {
                                this.updateOrder()
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