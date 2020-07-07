import React, { Component, Fragment } from "react";
import { singlePost, remove, like, unlike } from "./ApiPost";
import DefaultPost from "../images/post.png";
import { Link, Redirect } from "react-router-dom";
import { isAuth } from "../helper";
import Menu from "../core/Menu";
import Comment from "./Comment";

class SinglePost extends Component {
  state = {
    post: "",
    redirectToHome: false,
    redirectToSignin: false,
    like: false,
    likes: 0,
    comments: [],
  };

  checkLike = (likes) => {
    const userId = isAuth() && isAuth().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments: data.comments,
        });
      }
    });
  };

  updateComments = (comments) => {
    this.setState({ comments });
  };

  likeToggle = () => {
    if (!isAuth()) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    let callApi = this.state.like ? unlike : like;
    const userId = isAuth().user._id;
    const postId = this.state.post._id;
    const token = isAuth().token;

    callApi(userId, token, postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length,
        });
      }
    });
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuth().token;
    remove(postId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your post?");
    if (answer) {
      this.deletePost();
    }
  };

  renderPost = (post) => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

    const { like, likes } = this.state;

    return (
      <Menu>
        <div className="card-body">
          <img
            src={`http://localhost:4000/post/photo/${post._id}`}
            alt={post.title}
            onError={(i) => (i.target.src = `${DefaultPost}`)}
            className="img-thunbnail mb-3"
            style={{
              height: "300px",
              width: "100%",
              objectFit: "cover",
            }}
          />

          {like ? (
            <h3 onClick={this.likeToggle}>
              <i
                className="fa fa-thumbs-up text-success bg-dark"
                style={{ padding: "10px", borderRadius: "50%" }}
              />{" "}
              {likes} Like
            </h3>
          ) : (
            <h3 onClick={this.likeToggle}>
              <i
                className="fa fa-thumbs-up text-warning bg-dark"
                style={{ padding: "10px", borderRadius: "50%" }}
              />{" "}
              {likes} Like
            </h3>
          )}

          <p className="card-text">{post.body}</p>
          <br />
          <p className="font-italic mark">
            Posted by <Link to={`${posterId}`}>{posterName} </Link>
            on {new Date(post.created).toDateString()}
          </p>
          <div className="d-inline-block">
            <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">
              Back to posts
            </Link>

            {isAuth().user && isAuth().user._id === post.postedBy._id && (
              <Fragment>
                <Link
                  to={`/post/edit/${post._id}`}
                  className="btn btn-raised btn-warning btn-sm mr-5"
                >
                  Update Post
                </Link>
                <button
                  onClick={this.deleteConfirmed}
                  className="btn btn-raised btn-danger"
                >
                  Delete Post
                </button>
              </Fragment>
            )}

            <div>
              {isAuth().user && isAuth().user.role === "admin" && (
                <div class="card mt-5">
                  <div className="card-body">
                    <h5 className="card-title">Admin</h5>
                    <p className="mb-2 text-danger">Edit/Delete as an Admin</p>
                    <Link
                      to={`/post/edit/${post._id}`}
                      className="btn btn-raised btn-warning btn-sm mr-5"
                    >
                      Update Post
                    </Link>
                    <button
                      onClick={this.deleteConfirmed}
                      className="btn btn-raised btn-danger"
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Menu>
    );
  };

  render() {
    const { post, redirectToHome, redirectToSignin, comments } = this.state;

    if (redirectToHome) {
      return <Redirect to={`/`} />;
    } else if (redirectToSignin) {
      return <Redirect to={`/signin`} />;
    }

    return (
      <div className="container">
        <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

        {!post ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          this.renderPost(post)
        )}

        <Comment
          postId={post._id}
          comments={comments.reverse()}
          updateComments={this.updateComments}
        />
      </div>
    );
  }
}

export default SinglePost;
