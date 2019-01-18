import React from 'react';
import {Link} from 'react-router-dom';

class AnonymousUser extends React.Component {

    componentDidMount() {
        console.log("anonymous");
    }

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
                                <Link to={`/signUp`}>
                                    <h5>
                                        Sign up
                                    </h5>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <h5>|</h5>
                            </li>
                            <li className="list-inline-item">
                                <Link to={`/logIn`}>
                                    <h5>
                                        Log In
                                    </h5>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </dd>
            </dl>
        );

    }
}

export default AnonymousUser