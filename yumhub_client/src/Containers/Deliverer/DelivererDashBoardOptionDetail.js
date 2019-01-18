import React, {Component} from 'react';
import DelivererProfile from "../../Components/DelivererDashboard/DelivererProfile";
import DelivererRecentAssignedOrders from "../../Components/DelivererDashboard/DelivererAssignedOrders/DelivererRecentAssignedOrders";

class DelivererDashBoardOptionDetail extends Component {
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
                    this.state.option === "profile" &&
                    <DelivererProfile/>
                }
                {
                    this.state.option === "recentAssignedOrders" &&
                    <DelivererRecentAssignedOrders/>
                }
            </div>

        )
    }
}

export default DelivererDashBoardOptionDetail;