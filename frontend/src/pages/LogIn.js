import React, { Component } from 'react';
import {PUBLIC_URL,API_PREFIX} from '../utils/Dirs'
import checkResponse from '../utils/checkResponse'
import TextField from '@material-ui/core/TextField';
import { Button,Link} from '../components/common';
import Header from '../components/common/Header';

class LogIn extends Component {

    
  state = {};

  handleChange = e => {
    let input = {};
    input[e.target.name] = e.target.value;
    this.setState(input);
  };

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  LogIn = e => {
    e.preventDefault()
    const  {email,password} = this.state
    if(!email){
      return this.setState({err:"please insert your email",emailError:true,passwordError:false})
    }
      if(!this.validateEmail(email)){
        return this.setState({err:"please insert a valid email address",emailError:true,passwordError:false})
      }
      if(!password){
        return this.setState({err:"please insert your password",emailError:false,passwordError:true})
      }
      if(password.length  < 6){
        return this.setState({err:"password is too short",emailError:false,passwordError:true})
      }
    
    const URL = PUBLIC_URL + API_PREFIX + "login"
    console.log(URL)
    checkResponse(URL,"post",{email,password})
    .then(result => {
      if(result.response){
       return this.setState({err:result.response.data.error,emailError:true,passwordError:true})
      }
      // console.log(result)
      localStorage.setItem("API_TOKEN",result.data.token)
      localStorage.setItem("user_id",result.data.user_id)
      return this.props.history.push("/profile")
    })

  };

  err = ()=>{
    if(this.state.err){
      return <h5 style={{color:"red"}}>{this.state.err}</h5>

    }
  }
    render() {
        return (
          <div className="formContainer">
          <form onSubmit={this.LogIn}>
            {this.err()}
            <Header>
              Login
            </Header>
          <TextField
          className="textField"
          label="email"
          onChange={e=>this.handleChange(e)}
          error={this.state.emailError}
          placeholder="example@example.com"
          margin="dense"
          name="email"
          variant="outlined"
          />
        <TextField
        className="textField"
          required
          error={this.state.passwordError}
          name="password"
          onChange={e=>this.handleChange(e)}
          type="password"
          label="password"
          margin="dense"
          variant="outlined"
          />
          <Link onClick={_=>this.props.history.push('/register')}>
            Don't have an account ?
          </Link>
          <Button type="submit">
            Login
          </Button>
          </form>
          </div>

        );
    }
}

export default LogIn;