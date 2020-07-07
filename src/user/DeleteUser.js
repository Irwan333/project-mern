import React, { Component } from "react";
import { isAuth } from "../helper";
// import { remove } from "js-cookie";
import { remove } from "./ApiUser";
import { signout } from "../helper/index";
import { Redirect } from "react-router-dom";

class DeleteUser extends Component {
  state = {
    redirect: false,
  };
  deleteAccount = () => {
    const token = isAuth().token;
    const userId = this.props.userId;
    remove(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        signout(() => console.log("user dihapus!"));
        this.setState({ redirect: true });
      }
    });
  };
  deleteConfirmed = () => {
    let answer = window.confirm("Anda yakin ingin menghapus Akun?");
    if (answer) {
      this.deleteAccount();
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <button
        onClick={this.deleteConfirmed}
        className="btn btn-raised btn-danger"
      >
        Hapus Profil
      </button>
    );
  }
}

export default DeleteUser;
