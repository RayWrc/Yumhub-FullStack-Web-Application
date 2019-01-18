import React, {Component} from 'react';
import AllUsers from "../../Components/AdminDashboard/AllUsers/AllUsers";
import AllRestaurants from "../../Components/AdminDashboard/AllRestaurants/AllRestaurants";
import AllOrders from "../../Components/AdminDashboard/AllOrders/AllOrders";

class AdminDashBoardOptionDetail extends Component {
    constructor(props) {
        super(props);
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
                {
                    this.state.option === "allUsers" &&
                    <AllUsers/>
                }
                {
                    this.state.option === "allRestaurants" &&
                    <AllRestaurants/>
                }
                {
                    this.state.option === "allOrders" &&
                    <AllOrders/>
                }
            </div>

        )
    }
}

export default AdminDashBoardOptionDetail;