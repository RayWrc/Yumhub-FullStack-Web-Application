import React, {Component} from 'react';
import {Link} from "react-router-dom";

class OwnerDashBoardList extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="table-responsive-sm">
                    <table className="table">
                        <tbody>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/owner/${this.props.username}/profile`}
                                    className="table-default">
                                    Profile
                                </Link>
                            </td>
                        </tr>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/owner/${this.props.username}/recentOrders`}
                                    className="table-default">
                                    Recent Orders
                                </Link>
                            </td>
                        </tr>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/owner/${this.props.username}/restaurantBasicInfo`}
                                    className="table-default">
                                    Restaurant Basic Information
                                </Link>
                            </td>
                        </tr>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/owner/${this.props.username}/menu`}
                                    className="table-default">
                                    Edit Menu
                                </Link>
                            </td>
                        </tr>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/owner/${this.props.username}/descriptionPictures`}
                                    className="table-default">
                                    Edit Description Pictures
                                </Link>
                            </td>
                        </tr>
                        <tr className="table-default">
                            <td>
                                <Link
                                    to={`/dashboard/owner/${this.props.username}/preview`}
                                    className="table-default">
                                    Preview Restaurant
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

export default OwnerDashBoardList;