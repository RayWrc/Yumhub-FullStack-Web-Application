import React, {Component} from 'react';
import * as constants from "../../Constants/Users";
import UserService from '../../Services/UserServiceClient';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.selectUserType = this.selectUserType.bind(this);
        this.userSignUp = this.userSignUp.bind(this);
        this.userService = UserService.instance;
        this.state = {
            userType: constants.CUSTOMER_USER,
            username: "",
            password: ""
        };
    }

    selectUserType(event) {
        this.setState({
                          userType: event.target.value
                      });
    }

    userSignUp() {
        let user = {
            userType: this.state.userType,
            username: this.state.username,
            password: this.state.password
        };
        this.userService.userSignUp(user).then(() => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div className="container">
                <h2>Sign up</h2>
                <br/>
                <form>
                    <div className="form-group row">
                        <label htmlFor="userType" className="col-sm-2 col-form-label">
                            User Type
                        </label>
                        <div className="col-sm-10">
                            <select onChange={this.selectUserType}
                                    className="custom-select-sm  wbdv-btn-right-margin form-control"
                                    id="userType">
                                <option value={constants.CUSTOMER_USER}>Customer</option>
                                <option value={constants.OWNER_USER}>Restaurant Owner</option>
                                <option value={constants.DELIVERER_USER}>Deliverer</option>
                                <option value={constants.ADMIN_USER}>Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-2 col-form-label">
                            Username
                        </label>
                        <div className="col-sm-10">
                            <input onChange={(event) => {
                                this.setState({
                                                  username: event.target.value

                                              })
                            }}
                                   type="text" className="form-control" id="username"
                                   placeholder="user name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-form-label">
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input onChange={(event) => {
                                this.setState({
                                                  password: event.target.value

                                              })
                            }}
                                   type="password" className="form-control" id="password"
                                   placeholder="Password"/>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <label className="col-sm-2 col-form-label"/>
                    <div className="col-sm-10">
                        <button onClick={this.userSignUp} className="btn btn-primary btn-block">
                            Sign up
                        </button>
                    </div>
                </div>

            </div>

        )
    }
}

export default SignUp;