import React, {Component} from 'react';
import UserService from "../../Services/UserServiceClient";
import * as constants from "../../Constants/Users"

class DelivererProfile extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.profileUpdate = this.profileUpdate.bind(this);
        this.state = {
            userId: 0,
            username: "",
            email: "",
            password: "",
            address: "",
            phone: "",
            userType: "",
            registerTime: "",
            carPlate: "",
            rating: 0,
            ratingAmount: 0,
            isFree: false
        };
    }

    componentDidMount() {
        this.userService.findCurrentUser().then((user) => {
            console.log(user);
            this.setState({
                              userId: user.id,
                              username: user.username,
                              email: user.email,
                              password: user.password,
                              address: user.address,
                              phone: user.phone,
                              userType: user.userType,
                              registerTime: new Date(user.registered).toLocaleString(),
                              carPlate: user.carPlate,
                              rating: user.rating,
                              ratingAmount: user.ratingAmount,
                              isFree: user.isFree
                          })
        })
    }

    profileUpdate() {
        let user = {
            id: this.state.userId,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            phone: this.state.phone,
            carPlate: this.state.carPlate
        };
        this.userService.delivererProfileUpdate(user).then(() => {
            alert("Profile has been updated")
        })

    }

    render() {
        // console.log(this.state.userType);
        return (
            <div className="container-fluid">
                <h2 id="title">
                    Profile
                </h2>

                <form>
                    <div className="form-group row">
                        <label htmlFor="userName"
                               className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input
                                onChange={(event) => this.setState({username: event.target.value})}
                                defaultValue={this.state.username} type="text"
                                className="form-control"
                                id="userName"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input onChange={(event) => this.setState({email: event.target.value})}
                                   defaultValue={this.state.email} type="email"
                                   className="form-control"
                                   id="email"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password"
                               className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input
                                onChange={(event) => this.setState({password: event.target.value})}
                                defaultValue={this.state.password} type="password"
                                className="form-control"
                                id="password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="Residential"
                               className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                            <input
                                onChange={(event) => this.setState({address: event.target.value})}
                                defaultValue={this.state.address} type="text"
                                className="form-control"
                                id="Residential"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phone"
                               className="col-sm-2 col-form-label">Phone Number</label>
                        <div className="col-sm-10">
                            <input
                                onChange={(event) => this.setState({phone: event.target.value})}
                                defaultValue={this.state.phone} type="phone"
                                className="form-control"
                                id="phone"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="car"
                               className="col-sm-2 col-form-label">Car Plate</label>
                        <div className="col-sm-10">
                            <input
                                onChange={(event) => this.setState({carPlate: event.target.value})}
                                defaultValue={this.state.carPlate} type="text"
                                className="form-control"
                                id="car"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="userType"
                               className="col-sm-2 col-form-label">User type</label>
                        <div className="col-sm-10">
                            <select id="userType" className="form-control" disabled="disabled"
                                    value={this.state.userType}>
                                <option value={constants.CUSTOMER_USER}>Customer</option>
                                <option value={constants.OWNER_USER}>Restaurant owner</option>
                                <option value={constants.DELIVERER_USER}>Deliverer</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="register"
                               className="col-sm-2 col-form-label">Registered Time</label>
                        <div className="col-sm-10">
                            <input
                                value={this.state.registerTime} type="text"
                                className="form-control"
                                id="register" disabled="disabled"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="rating"
                               className="col-sm-2 col-form-label">Deliverer Rating</label>
                        <div className="col-sm-10">
                            <input
                                value={this.state.rating} type="text"
                                className="form-control"
                                id="rating" disabled="disabled"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="amount"
                               className="col-sm-2 col-form-label">Received Rating Amount</label>
                        <div className="col-sm-10">
                            <input
                                value={this.state.ratingAmount} type="text"
                                className="form-control"
                                id="amount" disabled="disabled"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="status"
                               className="col-sm-2 col-form-label">Current Status</label>
                        {
                            this.state.isFree === true &&
                            <div className="col-sm-10">
                                <input
                                    value="Free to deliver orders" type="text"
                                    className="form-control"
                                    id="status" disabled="disabled"/>
                            </div>

                        }
                        {
                            this.state.isFree === false &&
                            <div className="col-sm-10">
                                <input
                                    value="Busy for delivery" type="text"
                                    className="form-control"
                                    id="status" disabled="disabled"/>
                            </div>
                        }
                    </div>
                </form>
                <div className="float-right">
                    <button onClick={this.profileUpdate} className="btn btn-primary btn-info">
                        Update
                    </button>
                </div>
            </div>

        )
    }
}

export default DelivererProfile;