import React, { Component } from "react";
import {PUBLIC_URL,API_PREFIX} from '../utils/Dirs'
import checkResponse from '../utils/checkResponse'
import TextField from '@material-ui/core/TextField';
import {Button, Link} from "../components/common";
import Header from "../components/common/Header";

class Register extends Component {
  state = {};

  handleChange = e => {
    let input = {};
    input[e.target.name] = e.target.value;
    this.setState(input);
  };

  createAccount = e => {
    e.preventDefault()
    const  {first_name,last_name,email,password,confirm_password} = this.state
      if(!this.validateEmail(email)){
        return this.setState({err:"please insert a valid email address",emailError:true,passwordError:false})
      }
      if(!password || !confirm_password){
        return this.setState({err:"please fill in the missing fields"})
      }
      if(password.length < 6){
        return this.setState({err:"password should at least 6 charachters long",emailError:false,passwordError:true})
      }
      if(password != confirm_password){
        return this.setState({err:"passwords do not match",emailError:false,passwordError:true})
      }
    
    const URL = PUBLIC_URL+ API_PREFIX + "register"
    console.log(URL)
    checkResponse(URL,"post",{first_name,last_name,email,password})
    .then(result => {
      if(result.response){
       return this.setState({err:result.response.data.error})
        
      }
      return this.props.history.push("/login")
    })

  };

  
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  err = ()=>{
    if(this.state.err){
      return <h5 style={{color:"red"}}>{this.state.err}</h5>

    }
  }

  render() {
    return (
      <div className="formContainer">

      <form onSubmit={this.createAccount}>
      <Header>
        Create an account
      </Header>
      {this.err()}
      <TextField
      className="textField"
      label="first name"
      onChange={e=>this.handleChange(e)}
      margin="dense"
      name="first_name"
      variant="outlined"
      required
      />
 <TextField
 className="textField"
 label="last name"
 onChange={e=>this.handleChange(e)}
 margin="dense"
 name="last_name"
 variant="outlined"
 required
 />
    <TextField
    className="textField"
    label="email"
    onChange={e=>this.handleChange(e)}
    error={this.state.emailError}
    placeholder="example@example.com"
    margin="dense"
    name="email"
    variant="outlined"
    required
    />
  <TextField
  className="textField"
  required
  error={this.state.passwordError}
  name="confirm_password"
  onChange={e=>this.handleChange(e)}
  type="password"
  label="password"
  margin="dense"
  variant="outlined"
    />
 <TextField
 className="textField"
 required
    error={this.state.passwordError}
    name="password"
    onChange={e=>this.handleChange(e)}
    type="password"
    label="confirm password"
    margin="dense"
    variant="outlined"
    />
    <Link onClick={_=>this.props.history.push('/login')}>
    => login 
    </Link>
    <Button type="submit">
      Register
    </Button>
    </form>
    </div>
    
    );
  }
}

export default Register;
