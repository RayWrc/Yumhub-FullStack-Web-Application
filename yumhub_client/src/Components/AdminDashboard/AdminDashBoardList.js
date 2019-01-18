import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AdminDashBoardList extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="table-responsive-sm">
                    <table className="table">
                        <tbody>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/admin/${this.props.username}/allUsers`}
                                    className="table-default">
                                    All Users
                                </Link>
                            </td>
                        </tr>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/admin/${this.props.username}/allRestaurants`}
                                    className="table-default">
                                    All Restaurants
                                </Link>
                            </td>
                        </tr>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/admin/${this.props.username}/allOrders`}
                                    className="table-default">
                                    All Placed Orders
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

export default AdminDashBoardList;