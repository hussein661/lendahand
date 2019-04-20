import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div>
<div>
  <meta charSet="utf-8" />
  <title>RegistrationForm_v10 by Colorlib</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  {/* LINEARICONS */}
  <link rel="stylesheet" href="fonts/linearicons/style.css" />
  {/* STYLE CSS */}
  <link rel="stylesheet" href="css/style.css" />
  <div className="wrapper">
    <div className="inner">
      <img src="images/image-1.png" alt className="image-1" />
      <form action>
        <h3>New Account?</h3>
        <div className="form-holder">
          <span className="lnr lnr-user" />
          <input type="text" className="form-control" placeholder="Username" />
        </div>
        <div className="form-holder">
          <span className="lnr lnr-phone-handset" />
          <input type="text" className="form-control" placeholder="Phone Number" />
        </div>
        <div className="form-holder">
          <span className="lnr lnr-envelope" />
          <input type="text" className="form-control" placeholder="Mail" />
        </div>
        <div className="form-holder">
          <span className="lnr lnr-lock" />
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <div className="form-holder">
          <span className="lnr lnr-lock" />
          <input type="password" className="form-control" placeholder="Confirm Password" />
        </div>
        <button>
          <span>Register</span>
        </button>
      </form>
      <img src="images/image-2.png" alt className="image-2" />
    </div>
  </div>
  {/* This templates was made by Colorlib (https://colorlib.com) */}
</div>
        </div>
        );
    }
}

export default Register;