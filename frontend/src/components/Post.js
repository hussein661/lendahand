import React, { Component } from "react";
import formatDate from "../utils/formatDate";
import {PUBLIC_URL} from "../utils/Dirs";
import { Button } from "./common";

class Post extends Component {
  render() {
    const { post } = this.props;
    var time = formatDate(post.created_at);
    let displayImage = post.images[0]
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`${PUBLIC_URL}/` + displayImage}
          alt=""
          alt="pimg"
        />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.description}</p>
        </div>
        <Button background="red" onClick={()=>this.props.history.push({
          pathname :"/problem/donate/" + post.id,
          state:post
        })}>
          Help
        </Button>
        <div className="card-footer">
          <small className="text-muted">{time}</small>
        </div>
      </div>
    );
  }
}

export default Post;
