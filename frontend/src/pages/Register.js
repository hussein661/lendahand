import React, { Component } from "react";
import {PUBLIC_URL,API_PREFIX} from '../utils/Dirs'
import checkResponse from '../utils/checkResponse'

class Register extends Component {
  state = {};

  handleChange = e => {
    let input = {};
    input[e.target.name] = e.target.value;
    this.setState(input);
  };
  createAccount = e => {
    e.preventDefault()
    const  {first_name,last_name,email,password} = this.state
    const URL = PUBLIC_URL+ API_PREFIX + "register"
    console.log(URL)
    checkResponse(URL,"post",{first_name,last_name,email,password})
    .then(result => {
      if(result.response){
        return console.log(result.response.data)
      }
      return console.log(result.data)
    })

  };


  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
            <form className="login100-form validate-form" onSubmit={this.createAccount}>
              <span className="login100-form-title p-b-33">
                Create an account
              </span>
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={e => this.handleChange(e)}
                />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={e => this.handleChange(e)}
                />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
                onChange={e => this.handleChange(e)}
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              <div
                className="wrap-input100 rs1 validate-input"
                data-validate="Password is required"
                onChange={e => this.handleChange(e)}
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              <div
                className="wrap-input100 rs1 validate-input"
                data-validate="Password is required"
                onChange={e => this.handleChange(e)}
              >
                <input
                  className="input100"
                  type="password"
                  name="confirm_password"
                  placeholder="confirm password"
                />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              <div className="container-login100-form-btn m-t-20">
                <button
                  type="submit"
                  className="login100-form-btn"
                >
                  Create
                </button>
              </div>
              <div className="text-center p-t-45 p-b-4">
                <span className="txt1">Forgot</span>
                <a href="#" className="txt2 hov1">
                  Username / Password?
                </a>
              </div>
              <div className="text-center">
                <span className="txt1">Already have an account</span>
                <a href="/LogIn" className="txt2 hov1">
                  Sign In
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
