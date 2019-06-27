import React, { Component } from "react";
import formatDate from '../utils/formatDate'


class Post extends Component {
  render() {
    const { post } = this.props;
    console.log(post.created_at)
    var time = (formatDate(post.created_at))
    return (
            <div className="card">
              <img className="card-img-top" src="https://images.pexels.com/photos/2504837/pexels-photo-2504837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                  {post.description}
                </p>
              </div>
              <div className="card-footer">
                <small className="text-muted">{time}</small>
              </div>
            </div>
    );
  }
}

export default Post;
