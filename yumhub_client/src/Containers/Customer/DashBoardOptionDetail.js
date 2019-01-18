import React, {Component} from 'react';
import UserService from '../../Services/UserServiceClient';
import CustomerProfile from "../../Components/CustomerDashboard/CustomerProfile";
import CustomerRecentOrders from "../../Components/CustomerDashboard/CustomerRecentOrders";

class DashBoardOptionDetail extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.state = {
            option: this.props.match.params.option
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.option !== prevProps.match.params.option) {
            this.setState({
                              option: this.props.match.params.option
                          });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                {this.state.option === "profile" &&
                 <CustomerProfile/>}
                {this.state.option === "recentOrders" &&
                 <CustomerRecentOrders/>}
            </div>

        )
    }
}

export default DashBoardOptionDetail;