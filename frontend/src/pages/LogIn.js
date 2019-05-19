import React, { Component } from 'react';
import {PUBLIC_URL,API_PREFIX} from '../utils/Dirs'
import checkResponse from '../utils/checkResponse'

class LogIn extends Component {

    
  state = {};

  handleChange = e => {
    let input = {};
    input[e.target.name] = e.target.value;
    this.setState(input);
  };

  LogIn = e => {
    e.preventDefault()
    const  {email,password} = this.state
    const URL = PUBLIC_URL + API_PREFIX + "login"
    console.log(URL)
    checkResponse(URL,"post",{email,password})
    .then(result => {
      if(result.response){
        return console.log(result.response.data)
        
      }
      // console.log(result)
      localStorage.setItem("API_TOKEN",result.data.token)
      localStorage.setItem("user_id",result.data.user_id)
      return this.props.history.push("/")
    })

  };


    render() {
        return (
<div className="limiter">
  <div className="container-login100">
    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
      <form className="login100-form validate-form" onSubmit={this.LogIn}>
        <span className="login100-form-title p-b-33">
          Account Login
        </span>
        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
          <input className="input100" type="text" name="email" placeholder="Email" onChange={e=>this.handleChange(e)}/>
          <span className="focus-input100-1" />
          <span className="focus-input100-2" />
        </div>
        <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
          <input className="input100" type="password" name="password" placeholder="Password"  onChange={e=>this.handleChange(e)}/>
          <span className="focus-input100-1" />
          <span className="focus-input100-2" />
        </div>
        <div className="container-login100-form-btn m-t-20">
          <button className="login100-form-btn" type="submit">
            Sign in
          </button>
        </div>
        <div className="text-center p-t-45 p-b-4">
          <span className="txt1">
            Forgot
          </span>
          <a href="#" className="txt2 hov1">
            Username / Password?
          </a>
        </div>
        <div className="text-center">
          <span className="txt1">
            Create an account?
          </span>
          <a href="/register" className="txt2 hov1">
            Sign up
          </a>
        </div>
      </form>
    </div>
  </div>
</div>

        );
    }
}

export default LogIn;