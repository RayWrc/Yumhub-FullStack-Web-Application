import React from 'react';

class DescriptionPictureItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: ""
        }
    }

    componentDidMount() {
        this.setState({
                          link: this.props.picLink
                      })
    }

    updateLink() {
        let pic = {
            link: this.state.link
        };
        this.props.updateLink(pic, this.props.picId);
    }

    render() {
        return (
            <tr>
                <td>
                    <input onChange={(event) => {
                        this.setState({
                                          link: event.target.value
                                      })
                    }}
                           className="form-control"
                           placeholder="Picture Link" defaultValue={this.state.link}/>
                </td>
                <td>
                    <button onClick={() => {
                        this.updateLink()
                    }}
                            className="btn btn-outline-success">
                        <i className="fa-lg fa fa-wrench" aria-hidden="true"/>
                        Update
                    </button>
                </td>
                <td>
                    <button onClick={() => {
                        this.props.deleteLink(this.props.picId)
                    }}
                            className="btn btn-outline-danger">
                        <i className="fa-lg fa fa-trash-o" aria-hidden="true"/>
                        Delete
                    </button>
                </td>

            </tr>
        )
    }
}

export default DescriptionPictureItem;