import React, {Component} from 'react';
import {Link} from "react-router-dom";

class DelivererDashBoardList extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="table-responsive-sm">
                    <table className="table">
                        <tbody>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/deliverer/${this.props.username}/profile`}
                                    className="table-default">
                                    Profile
                                </Link>
                            </td>
                        </tr>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/deliverer/${this.props.username}/recentAssignedOrders`}
                                    className="table-default">
                                    Recent Assigned Orders
                                </Link>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default DelivererDashBoardList;