import React, { Component } from "react";
import { PUBLIC_URL } from "../utils/Dirs";
import "../styles/profileStyles.css";

class ProfileLayout extends Component {


      
  render() {

    return (
      <div className="container">
        <header>
          <i className="fa fa-bars" aria-hidden="true" />
        </header>
        <main>
          <div className="row">
            <div className="left col-lg-4">
              <div className="photo-left">
                <img
                  className="photo"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                />
                <div className="active" />
              </div>
              <h4 className="name">{this.props.profile.user.first_name}</h4>
              {/* <p className="info">UI/UX Designer</p> */}
              <p className="info">{this.props.profile.user.email}</p>
              <div className="stats row">
                <div className="stat col-xs-4" style={{ paddingRight: "50px" }}>
                  <p className="number-stat">3,619 $</p>
                  <p className="desc-stat">Gives</p>
                </div>
                <div className="stat col-xs-4">
                  <p className="number-stat">42 $</p>
                  <p className="desc-stat">Receives</p>
                </div>
                <div className="stat col-xs-4" style={{ paddingLeft: "50px" }}>
                  <p className="number-stat">
                    {this.props.profile.myPosts.length}
                  </p>
                  <p className="desc-stat">Posts</p>
                </div>
              </div>
              <p className="desc">
                Hi ! My name is Jane Doe. I'm a UI/UX Designer from Paris, in
                France. I really enjoy photography and mountains.
              </p>
              <div className="social">
                <i className="fa fa-facebook-square" aria-hidden="true" />
                <i className="fa fa-twitter-square" aria-hidden="true" />
                <i className="fa fa-pinterest-square" aria-hidden="true" />
                <i className="fa fa-tumblr-square" aria-hidden="true" />
              </div>
            </div>
            <div className="right col-lg-8">
              <ul className="nav">
                <li>posts</li>
                <li>Collections</li>
                <li>Groups</li>
                <li>About</li>
              </ul>
              <span className="follow">Endorse</span>
              <div className="row gallery">
                {this.props.profile.myPosts.map(post => {
                  return (
                    <div className="col-md-4" onClick={_=>this.props.history.push(`/problem/${post.id}`)}>
                      <img src={!post.images.length ? 'http://www.radiationreport.com/wp-content/uploads/2013/08/no-preview.jpg' : PUBLIC_URL + post.images[0].image} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ProfileLayout;
