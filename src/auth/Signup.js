// import React, { Component } from "react";
// import { signup } from "../helper";
// import Menu from "../core/Menu";
// import { Link } from "react-router-dom";

// class Signup extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       email: "",
//       password: "",
//       error: "",
//     };
//   }

//   handleChange = (name) => (event) => {
//     this.setState({ error: "" });
//     this.setState({ [name]: event.target.value });
//   };

//   clickSubmit = (event) => {
//     event.preventDefault();
//     const { name, email, password } = this.state;
//     const user = {
//       name,
//       email,
//       password,
//     };
//     // console.log(user);

//     // if (this.state.recaptcha) {
//     signup(user).then((data) => {
//       if (data.error) this.setState({ error: data.error });
//       else
//         this.setState({
//           error: "",
//           name: "",
//           email: "",
//           password: "",
//           open: true,
//         });
//     });
//     // } else {
//     //   this.setState({
//     //     error: "What day is today? Please write a correct answer!"
//     //   });
//     // }
//   };

//   signupForm = (name, email, password) => (
//     <form>
//       <div className="form-group">
//         <label className="text-muted">Nama</label>
//         <input
//           onChange={this.handleChange("name")}
//           type="text"
//           className="form-control"
//           value={name}
//         />
//       </div>
//       <div className="form-group">
//         <label className="text-muted">Email</label>
//         <input
//           onChange={this.handleChange("email")}
//           type="email"
//           className="form-control"
//           value={email}
//         />
//       </div>
//       <div className="form-group">
//         <label className="text-muted">password</label>
//         <input
//           onChange={this.handleChange("password")}
//           type="password"
//           className="form-control"
//           value={password}
//         />
//       </div>
//       <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>
//         Submit
//       </button>
//     </form>
//   );

//   render() {
//     const { name, email, password, error, open } = this.state;
//     return (
//       <Menu>
//         <div className="container">
//           <h2 className="mt-5 mb-5">Signup</h2>
//           <div
//             className="alert alert-danger"
//             style={{ display: error ? "" : "none" }}
//           >
//             {error}
//           </div>

//           <div
//             className="alert alert-info"
//             style={{ display: open ? "" : "none" }}
//           >
//             Akun telah dibuat. Silahkan <Link to="/signin">Masuk!</Link>
//           </div>
//           {this.signupForm(name, email, password)}
//         </div>
//       </Menu>
//     );
//   }
// }

// export default Signup;

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import Layout from "../core/Layout";
import Menu from "../core/Menu";
import axios from "axios";
import { isAuth } from "../helper";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log("DAFTAR BERHASIL", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        // toast.success(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log("Daftar Gagal!", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        // toast.error(error.response.data.error);
        console.log(error.response.data.error);
      });
  };

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="InputNama">Nama</label>
        <input
          onChange={handleChange("name")}
          type="text"
          value={name}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          value={email}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={clickSubmit}>
        {buttonText}
      </button>
    </form>
  );

  return (
    <Menu>
      <div className="col-md-6 offset-md-3">
        {/* <ToastContainer /> */}
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="p-5 text-center">Signup</h1>
        {signupForm()}
      </div>
    </Menu>
  );
};

export default Signup;
