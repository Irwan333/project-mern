import React, { Component } from "react";
import { follow, unfollow } from "./ApiUser";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

  render() {
    return (
      <div className="d-inline-block">
        {!this.props.following ? (
          <button
            onClick={this.followClick}
            className="btn btn-success btn-raised mr-5"
          >
            Ikuti
          </button>
        ) : (
          <button
            onClick={this.unfollowClick}
            className="btn btn-warning btn-raised"
          >
            Batal Ikuti
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
