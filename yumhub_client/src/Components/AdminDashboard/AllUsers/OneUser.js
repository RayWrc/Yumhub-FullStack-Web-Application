import React from 'react';
import * as constants from "../../../Constants/Users";
import UserService from "../../../Services/UserServiceClient"

class OneUser extends React.Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.changeState = this.changeState.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            username: "",
            address: "",
            email: "",
            phone: "",
            password: "",
            carPlate: "",
            ratingAmount: 0,
            rating: 0,
            status: "collapse",
            showId: 1
        }
    }

    componentDidMount() {
        if (this.props.user.userType === constants.DELIVERER_USER) {
            this.setState({
                              username: this.props.user.username,
                              address: this.props.user.address,
                              email: this.props.user.email,
                              phone: this.props.user.phone,
                              password: this.props.user.password,
                              carPlate: this.props.user.carPlate,
                              ratingAmount: this.props.user.ratingAmount,
                              rating: this.props.user.rating
                          })
        } else {
            this.setState({
                              username: this.props.user.username,
                              address: this.props.user.address,
                              email: this.props.user.email,
                              phone: this.props.user.phone,
                              password: this.props.user.password
                          })
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

    updateUser() {
        if (this.props.user.userType === constants.CUSTOMER_USER || this.props.user.userType
                                                                    === constants.OWNER_USER) {
            let user = {
                id: this.props.user.id,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                phone: this.state.phone
            };
            this.userService.adminUpdateUser(user).then(() => {
                alert("The user's information has been updated");
                this.props.findAllUsers();
            })
        } else if (this.props.user.userType === constants.DELIVERER_USER) {
            let user = {
                id: this.props.user.id,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                phone: this.state.phone,
                carPlate: this.state.carPlate,
                ratingAmount: this.state.ratingAmount,
                rating: this.state.rating
            };
            this.userService.adminUpdateDeliverer(user).then(() => {
                alert("The user's information has been updated");
                this.props.findAllUsers();
            })
        }
    }

    deleteUser(userId) {
        this.userService.deleteUserById(userId).then(() => {
            alert("This user has been deleted");
            this.props.findAllUsers();
        })
    }

    render() {
        if (this.props.user.userType === constants.ADMIN_USER) {
            return null;
        } else {
            return (
                <div className="card">
                    <div className="card-header" id={this.props.user.id}>
                        <ul className="list-inline row">
                            <li className="list-inline-item col-sm-2">
                                <h5 className="mb-0">
                                    <button onClick={() => {
                                        this.changeState()
                                    }} className="btn btn-link" type="button" data-toggle="collapse"
                                            data-target={"#" + this.props.user.id.toString()}
                                            aria-expanded="true"
                                            aria-controls={this.props.user.id.toString()}>
                                        {this.props.user.username}
                                    </button>
                                </h5>
                            </li>
                            <li className="list-inline-item col-sm-4">
                                User Type: {this.props.user.userType}
                            </li>
                            <li className="list-inline-item col-sm-4">
                                Registered time: {new Date(
                                this.props.user.registered).toLocaleString()}
                            </li>
                            <li className="list-inline-item col-sm-1">
                                <button onClick={() => {
                                    this.deleteUser(this.props.user.id)
                                }}
                                        className="btn btn-outline-danger">
                                    Remove
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div id={this.props.user.id.toString()} className={this.state.status}
                         aria-labelledby={this.props.user.id}
                         data-parent="#users">
                        <div className="card-body">
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="userName"
                                           className="col-sm-2 col-form-label">Username</label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={(event) => this.setState(
                                                {username: event.target.value})}
                                            defaultValue={this.props.user.username} type="text"
                                            className="form-control"
                                            id="userName"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="email"
                                           className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input onChange={(event) => this.setState(
                                            {email: event.target.value})}
                                               defaultValue={this.props.user.email} type="email"
                                               className="form-control"
                                               id="email"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="password"
                                           className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={(event) => this.setState(
                                                {password: event.target.value})}
                                            defaultValue={this.props.user.password} type="password"
                                            className="form-control"
                                            id="password"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="Residential"
                                           className="col-sm-2 col-form-label">Address</label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={(event) => this.setState(
                                                {address: event.target.value})}
                                            defaultValue={this.props.user.address} type="text"
                                            className="form-control"
                                            id="Residential"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="phone"
                                           className="col-sm-2 col-form-label">Phone Number</label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={(event) => this.setState(
                                                {phone: event.target.value})}
                                            defaultValue={this.props.user.phone} type="phone"
                                            className="form-control"
                                            id="phone"/>
                                    </div>
                                </div>
                                {
                                    this.props.user.userType === constants.DELIVERER_USER &&
                                    <div className="form-group row">
                                        <label htmlFor="car"
                                               className="col-sm-2 col-form-label">Car Plate</label>
                                        <div className="col-sm-10">
                                            <input
                                                onChange={(event) => this.setState(
                                                    {carPlate: event.target.value})}
                                                defaultValue={this.props.user.carPlate} type="text"
                                                className="form-control"
                                                id="car"/>
                                        </div>
                                    </div>

                                }
                                {
                                    this.props.user.userType === constants.DELIVERER_USER &&
                                    <div className="form-group row">
                                        <label htmlFor="rating"
                                               className="col-sm-2 col-form-label">
                                            Deliverer Rating
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                onChange={(event) => this.setState(
                                                    {rating: Number(event.target.value)})}
                                                defaultValue={this.props.user.rating} type="text"
                                                className="form-control"
                                                id="rating"/>
                                        </div>
                                    </div>
                                }

                                {
                                    this.props.user.userType === constants.DELIVERER_USER &&
                                    <div className="form-group row">
                                        <label htmlFor="amount"
                                               className="col-sm-2 col-form-label">
                                            Received Rating Amount
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                onChange={(event) => this.setState(
                                                    {ratingAmount: Number(event.target.value)})}
                                                defaultValue={this.props.user.ratingAmount}
                                                type="text"
                                                className="form-control"
                                                id="amount"/>
                                        </div>
                                    </div>
                                }
                            </form>
                            <div className="float-right">
                                <button onClick={() => {
                                    this.updateUser()
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
}

export default OneUser