import React, { Component } from "react";
import { isAuth } from "../helper";
import { read, update, updateUser } from "./ApiUser";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      about: "",
    };
  }

  init = (userId) => {
    const token = isAuth().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: "",
          loading: false,
          about: data.about,
        });
      }
    });
  };

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({ error: "ukuran file tidak boleh lebih dari 1mb" });
      return false;
    }
    if (name.length === 0) {
      this.setState({ error: "Nama harus diisi", loading: false });
      return false;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "Email harus diisi",
        loading: false,
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password harus lebih dari 6 karakter",
        loading: false,
      });
      return false;
    }
    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuth().token;

      update(userId, token, this.userData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true,
            });
          });
      });
    }
  };

  signupForm = (name, email, about, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Photo Profile</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Nama</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Tentang</label>
        <textarea
          onChange={this.handleChange("about")}
          type="text"
          className="form-control"
          value={about}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>
        Ubah
      </button>
    </form>
  );

  render() {
    const {
      id,
      name,
      email,
      password,
      redirectToProfile,
      error,
      loading,
      about,
    } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const photoUrl = id
      ? `http://localhost:4000/user/photo/${id}?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading</h2>
          </div>
        ) : (
          ""
        )}
        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={(i) => (i.target.src = `${DefaultProfile}`)}
          alt={name}
        />
        {this.signupForm(name, email, about, password)}
      </div>
    );
  }
}

export default EditProfile;
