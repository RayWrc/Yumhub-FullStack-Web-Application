import React from 'react';
import {Link} from 'react-router-dom'

class CustomerUser extends React.Component {

    render() {
        return (
            <dl className="row">
                <dt className="col-sm-3">
                    <h1>
                        YumHub
                    </h1>
                </dt>
                <dd className="col-sm-9">
                    <div className="float-right">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <Link to={`/profile/customer/${this.props.currentUser.username}`}>
                                    <h4>
                                        {this.props.currentUser.username}
                                    </h4>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <button onClick={this.props.logOut}
                                        className="btn btn-outline-danger">
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </dd>
            </dl>
        );

    }
}

export default CustomerUser;