import React, { Component } from "react";
import { findPeople, follow } from "./ApiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import { isAuth } from "../helper";
import Menu from "../core/Menu";

class FindPeople extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      open: false,
    };
  }

  componentDidMount() {
    const userId = isAuth().user._id;
    const token = isAuth().token;

    findPeople(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  clickFollow = (user, i) => {
    const userId = isAuth().user._id;
    const token = isAuth().token;

    follow(userId, token, user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(i, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}`,
        });
      }
    });
  };

  renderUsers = (users) => (
    <div className="row">
      {users.map((user, i) => (
        <div className="card col-md-4" key={i}>
          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail"
            src={`http://localhost:4000/user/photo/${user._id}`}
            onError={(i) => (i.target.src = `${DefaultProfile}`)}
            alt={user.name}
          />
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
            <Link
              to={`/user/${user._id}`}
              className="btn btn-raised btn-primary btn-sm"
            >
              View Profile
            </Link>

            <button
              onClick={() => this.clickFollow(user, i)}
              className="btn btn-raised btn-info float-right btn-sm"
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users, open, followMessage } = this.state;
    return (
      <Menu>
        <div className="container">
          <h2 className="mt-5 mb-5">Find People</h2>

          {open && <div className="alert alert-success">{followMessage}</div>}

          {this.renderUsers(users)}
        </div>
      </Menu>
    );
  }
}

export default FindPeople;
