import React, {Component} from 'react';
import UserService from "../../../Services/UserServiceClient";
import OneUser from "./OneUser";
import * as constants from "../../../Constants/Users"

class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.findAllUsers = this.findAllUsers.bind(this);
        this.createUser = this.createUser.bind(this);
        this.state = {
            users: [],
            username: "",
            userType: constants.CUSTOMER_USER,
            password:""
        };
    }

    componentDidMount() {
        this.findAllUsers();
    }



    findAllUsers(){
        this.userService.findAllUsers().then((users) => {
            this.setState({
                              users: users,
                          })
        })
    }

    renderAllUsers() {
        let allUsers = null;
        if (this.state.users.length !== 0) {
            allUsers = this.state.users.map(
                (user) => {
                    return <OneUser key={user.id}
                                    user={user}
                                    findAllUsers={this.findAllUsers}/>
                });
        }

        return allUsers;
    }

    createUser(){
        let user = {
            username: this.state.username,
            userType: this.state.userType,
            password: this.state.password
        };
        console.log(user);
        this.userService.adminCreateUser(user).then(()=>{
            this.findAllUsers();
        })
    }

    render() {
        //console.log(this.state.users);
        return (
            <div className="container-fluid">
                <h2 id="title">
                    All Users
                </h2>
                <br/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <input onChange={(event) => {
                                this.setState({
                                                  username: event.target.value
                                              })
                            }}
                                   className="form-control"
                                   placeholder="Username"/>
                        </th>
                        <th>
                            <input onChange={(event) => {
                                this.setState({
                                                  password: event.target.value
                                              })
                            }}
                                   className="form-control"
                                   placeholder="Password" type="password"/>
                        </th>
                        <th>
                            <select onChange={(event) => {
                                this.setState({
                                    userType: event.target.value
                                              })
                            }}
                                    className="custom-select-sm  wbdv-btn-right-margin form-control"
                                    id="userType">
                                <option value={constants.CUSTOMER_USER}>Customer</option>
                                <option value={constants.OWNER_USER}>Restaurant Owner</option>
                                <option value={constants.DELIVERER_USER}>Deliverer</option>
                            </select>
                        </th>
                        <th/>
                        <th>
                            <button onClick={this.createUser}
                                    className="btn btn-info">
                                Add
                            </button>
                        </th>

                    </tr>
                    </thead>
                </table>
                <div className="accordion" id="users">
                    {this.renderAllUsers()}
                </div>

            </div>

        )
    }
}

export default AllUsers;