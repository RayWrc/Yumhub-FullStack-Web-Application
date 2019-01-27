import React from 'react';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            name: "",
            price: 0
        }
    }

    componentDidMount() {
        this.setState({
                          description: this.props.description,
                          name: this.props.name,
                          price: this.props.price
                      })
    }

    updateDish() {
        let Dish = {
            description: this.state.description,
            name: this.state.name,
            price: this.state.price
        };
        this.props.updateDish(Dish, this.props.dishId);
    }

    render() {
        return (
            <tr>
                <td>
                    <input onChange={(event) => {
                        this.setState({
                                          name: event.target.value
                                      })
                    }}
                           className="form-control"
                           placeholder="Dish name" defaultValue={this.props.name}/>
                </td>
                <td>
                    <input onChange={(event) => {
                        this.setState({
                                          description: event.target.value
                                      })
                    }}
                           className="form-control"
                           placeholder="Dish Description" defaultValue={this.props.description}/>
                </td>
                <td>
                    <input onChange={(event) => {
                        this.setState({
                                          price: event.target.value
                                      })
                    }}
                           className="form-control"
                           placeholder="Dish Price" defaultValue={this.props.price}/>
                </td>
                <td>
                    <button onClick={() => {
                        this.updateDish()
                    }}
                            className="btn btn-outline-success">
                        <i className="fa-lg fa fa-wrench" aria-hidden="true"/> Update
                    </button>
                </td>
                <td>
                    <button onClick={() => {
                        this.props.deleteDish(this.props.dishId)
                    }}
                            className="btn btn-outline-danger">
                        <i className="fa-lg fa fa-trash-o" aria-hidden="true"/> Delete
                    </button>
                </td>
            </tr>
        )
    }
}

export default MenuItem;