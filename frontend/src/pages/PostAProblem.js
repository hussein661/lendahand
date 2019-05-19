import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {DropzoneArea} from 'material-ui-dropzone'
import {API_PREFIX,PUBLIC_URL} from '../utils/Dirs'
import checkRespone from '../utils/checkResponse'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50,
    color:"red",
    background:"cyan"
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 50,
  },
});


class PostAProblem extends Component {
  state = {
    title:"untitled",
    amount:5,
    description:"some desc",
    image:"myimg",
    files: []


  }

  handleFileChange(files){
    this.setState({
      files: files
    });
  }
  handleInputChange = (e) =>{
    this.setState({[e.target.name]:e.target.value})
    console.log(this.state)
  }

 postProblem = e =>{
   e.preventDefault()
   const data = {
     title:this.state.title,
     amount:this.state.amount,
     description:this.state.description,
     user_id:localStorage.getItem("user_id")
   }
    const URL = PUBLIC_URL + API_PREFIX + "problems/post"
    checkRespone(URL,"post",data).then(r=>{
      alert("post created by " + data.user_id)
    })
    
 }



  render() {
    
    const { classes } = this.props;
      return (
        <form  noValidate autoComplete="off" style={{background:"rgba(255,255,255,0.5)"}} onSubmit={this.postProblem}>
          <h1 style={{textAlign:"center"}}>please specify your problem</h1>
          <div style={{textAlign:"center"}}>

          <TextField
            label="Title"            
            className={classes.textField}
            value={this.state.name}
            onChange={e=>this.handleInputChange(e)}
            margin="normal"
            name="title"
            variant="outlined"
            
            // multiline
            style={{background:"white",width:"80%"}}
            
            // fullWidth
            />
        <TextField
          id="outlined-password-input"
          label="Description"
          className="InputField"
          autoComplete="current-password"
          margin="normal"
          name="description"
          onChange={e=>this.handleInputChange(e)}
          variant="outlined"
          style={{background:"white",width:"80%",color:"blue"}}
          multiline
          rowsMax="4"

        />
                <TextField
          id="outlined-password-input"
          label="Amount"
          className="InputField"
          margin="normal"
          name="amount"
          type="number"
          onChange={e=>this.handleInputChange(e)}
          variant="outlined"
          value={this.state.amount}
          style={{background:"white",width:"80%",color:"blue"}}

        />
        <br/>
        <DropzoneArea 
        onChange={this.handleFileChange.bind(this)}
        filesLimit={5}
        />
        <br/>
        <Button variant="contained" color="primary" type="submit">
        Post your problem
      </Button>
            </div>
        </form>
)
  }
}



export default withStyles(styles)(PostAProblem);
