import React, {Component} from 'react';
import UserService from "../../../Services/UserServiceClient";
import SearchRestaurantService from "../../../Services/SearchRestaurantServiceClient";
import OwnerService from "../../../Services/OwnerServiceClient";
import DescriptionPictureItem from "./DescriptionPictureItem";

class RestaurantDescriptionPictures extends Component {
    constructor(props) {
        super(props);
        this.searchRestaurantService = SearchRestaurantService.instance;
        this.userService = UserService.instance;
        this.ownerService = OwnerService.instance;
        this.updateLink = this.updateLink.bind(this);
        this.addLink = this.addLink.bind(this);
        this.deleteLink = this.deleteLink.bind(this);
        this.state = {
            restaurant: {},
            descriptionPictures: [],
            picLink: ""
        };
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then((user) => {
                return this.setState({
                                         restaurant: user.restaurant
                                     });

            }).then(() => {
            if (this.state.restaurant !== null) {
                this.ownerService.findAllPics(this.state.restaurant.id)
                    .then((descriptionPictures) => {
                        this.setState({
                                          descriptionPictures: descriptionPictures
                                      })
                    })
            }
        })
    }

    renderDescriptionPictures() {
        let pictures = null;
        if (this.state.descriptionPictures !== null) {
            pictures = this.state.descriptionPictures.map(
                (picture) => {
                    return <DescriptionPictureItem key={picture.id}
                                                   picId={picture.id}
                                                   picLink={picture.link}
                                                   updateLink={this.updateLink}
                                                   deleteLink={this.deleteLink}/>
                }
            )
        }
        return pictures;
    }

    updateLink(pic, picId) {
        this.ownerService.updateDescriptionPic(pic, picId).then(() => {
            alert("This picture has been updated");
        })

    }

    addLink() {
        let linkPic = {
            link: this.state.picLink
        };
        this.ownerService.addPicLinkForRestaurant(linkPic, this.state.restaurant.id).then(() => {
            this.ownerService.findAllPics(this.state.restaurant.id).then((descriptionPictures) => {
                this.setState({
                                  descriptionPictures: descriptionPictures
                              })
            })

        })
    }

    deleteLink(picId) {
        this.ownerService.deletePicForRestaurant(picId).then(() => {
            this.ownerService.findAllPics(this.state.restaurant.id).then((descriptionPictures) => {
                this.setState({
                                  descriptionPictures: descriptionPictures
                              })
            })
        })
    }

    render() {
        console.log(this.state);
        return (
            <div className="container-fluid">
                <h2 id="title">
                    Restaurant Description Pictures
                </h2>
                <br/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <input onChange={(event) => {
                                this.setState({
                                                  picLink: event.target.value
                                              })
                            }}
                                   className="form-control"
                                   placeholder="New Description Picture Link"/>
                        </th>
                        <th/>

                        <th>
                            <button onClick={this.addLink}
                                    className="btn btn-info">
                                Add
                            </button>
                        </th>
                    </tr>

                    <tr className="thead-light">
                        <th>Description Picture Link</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderDescriptionPictures()}
                    </tbody>
                </table>

            </div>

        )
    }
}

export default RestaurantDescriptionPictures;