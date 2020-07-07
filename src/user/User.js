import React, { Component } from "react";
import Menu from "../core/Menu";
import { List } from "./ApiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class User extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    List().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          users: data,
        });
      }
    });
  }

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
              className="btn btn-raised btn-primary"
            >
              Lihat profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
  render() {
    const { users } = this.state;
    return (
      <Menu>
        <div className="container">
          <h2 className="mt-5 mb-5"> Pengguna </h2>
          {this.renderUsers(users)}
        </div>
      </Menu>
    );
  }
}

export default User;
