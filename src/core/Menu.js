import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../helper";

const Menu = ({ children, match, history }) => {
  const isActive = (path) => {
    if (match.path === path) {
      return "nav-link OpenSans-Bold";
    } else {
      return "nav-link OpenSans-Regular";
    }
  };

  // const isActive = (history, path) => {
  //   if (history.location.pathname === path) {
  //     return "nav-link OpenSans-Bold";
  //   } else {
  //     return "nav-link OpenSans-Regular";
  //   }
  // };

  const nav = () => (
    <nav className="navbar navbar-light fixed-top navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="#">
          LOGO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainMenu">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className={isActive("/")}>
                Home
              </Link>
            </li>
            {isAuth() && (
              <Fragment>
                <li className="nav-item">
                  <Link to="/users" className={isActive("/users")}>
                    Pengguna
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/post/create" className={isActive("/post/create")}>
                    Buat Post
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
          {!isAuth() && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/signup" className={isActive("/signup")}>
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signin" className={isActive("/signin")}>
                  Sign In
                </Link>
              </li>
            </ul>
          )}

          {/* {isAuth() && isAuth().role === "admin" && (
              <li className="nav-item">
                <Link className={isActive("/admin")} to="/admin">
                  {isAuth().name}
                </Link>
              </li>
            )}

            {isAuth() && isAuth().role === "subscriber" && (
              <li className="nav-item">
                <Link className={isActive("/private")} to="/private">
                  {isAuth().name}
                </Link>
              </li>
            )} */}

          {isAuth() && isAuth().user.role === "admin" && (
            <li className="nav-item">
              <Link
                to={`/admin`}
                style={isActive(history, `/admin`)}
                className="nav-link"
              >
                Admin
              </Link>
            </li>
          )}

          {isAuth() && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={`/findpeople`} className={isActive(`/findpeople`)}>
                  Find People
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={`/user/${isAuth().user._id}`}
                  className={isActive(`/user/${isAuth().user._id}`)}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#fff" }}
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Keluar
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );

  return (
    <Fragment>
      {nav()}
      {children}
    </Fragment>
  );
};

export default withRouter(Menu);
