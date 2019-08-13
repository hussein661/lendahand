import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import {Button,Header} from './common';
import {PUBLIC_URL,API_PREFIX} from '../utils/Dirs'
import checkResponse from "../utils/checkResponse";
import {NotificationContainer, NotificationManager} from 'react-notifications';
var validator = require('validator')

class PostDonate extends Component {
  state = {
    calledPost: {images:[]},
    donated:false,
  };
  componentWillMount() {
    this.setState({ calledPost: this.props.location.state });
  }

  handleChange = e => {
    let input = {};
    input[e.target.name] = e.target.value;
    this.setState(input);
  };
  
  err = () => {
    if(this.state.err){
        return(
            <div style={{textAlign:"center",fontSize:15,color:"red"}}>
                {this.state.err}
            </div>
        )
    }
  }

  validate = () =>{
      // this.setState({err:'',credit_card_error:false,amount_error:false,cvv_error:false,expiry_date_error:false})
      // let re_expiry_date = /\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})\b/
      // const {holder_name,credit_card,cvv,expiry_date,amount} = this.state
      //   if(!holder_name){
      //       this.setState({err:'incorrect holder name format'})
      //       return false
      //   }
      // if(credit_card.length !== 12){
      //     this.setState({err:'credit card is not valid',credit_card_error:true})
      //     return false
      // }
      // if(!validator.isNumeric(amount)){
      //     this.setState({err:"amount is ambigious",amount_error:true})
      //     return false
      // }
      // if(!validator.isNumeric(cvv) || cvv.length !== 3){
      //     this.setState({err:"cvv is not valid",cvv_error:true})
      //         return false
      // }
      // if(!re_expiry_date.test(expiry_date)){
      //     this.setState({err:"expiry date is not valid",expiry_date_error:true})
      //     return false
      // }
      return true
  }

  donate = e=>{
    this.setState({working:true})
      e.preventDefault()
      if(this.validate()){
          const data = {
              donor_id:localStorage.getItem("user_id"),
              problem_id:this.state.calledPost.id,
              receiver_id:this.state.calledPost.user_id,
              amount:this.state.amount,
              date:new Date()
          }
          const URL =  PUBLIC_URL + API_PREFIX + 'donate'
        checkResponse(URL,"POST",data).then(result=>{
          this.setState({working:false})
          NotificationManager.success('your donation has been sent, Thank you')
          setTimeout(() => {
            NotificationManager.info('Redirecting...')
          }, 1500);
          this.setState({donated:true})
          setTimeout(_=>this.props.history.push("/"), 3000);
          // return this.props.history.push("/")
        }
            
        )
      }

  }

  render() {
    return (
      <div className="formContainer" style={{width:"100%",marginRight:55}}>
        <div className="donatePost">
          <div className="galleryPost">
            {this.state.calledPost.images.map(img => (
              <div className="imageDiv">
                <img src={PUBLIC_URL + img} />
              </div>
            ))}
          </div>
          <div className="formPost">
            <form onSubmit={this.donate}>
              <Header>donate for username</Header>
              {this.err()}
              {/* <label for="fname">Accepted Cards</label>
            <div class="icon-container">
              <i class="fa fa-cc-visa" ></i>
              <i class="fa fa-cc-amex"></i>
              <i class="fa fa-cc-mastercard"></i>
              <i class="fa fa-cc-discover"></i>
            </div> */}
            <TextField
                className="textField"
                label="Card Name"
                onChange={e => this.handleChange(e)}
                margin="dense"
                placeholder="JOHN SMITH"
                name="holder_name"
                variant="outlined"
                error={this.state.name_card_error}
              />
              <TextField
                className="textField"
                label="credit card"
                onChange={e => this.handleChange(e)}
                margin="dense"
                placeholder="1111222233334444"
                name="credit_card"
                variant="outlined"
                error={this.state.credit_card_error}
              />
              <TextField
                style={styles.smallInput}
                label="cvv"
                onChange={e => this.handleChange(e)}
                margin="dense"
                placeholder="333"
                name="cvv"
                error={this.state.cvv_error}
                variant="outlined"
              />
              <TextField
                style={styles.smallInput}
                label="expiry date"
                onChange={e => this.handleChange(e)}
                error={this.state.expiry_date_error}
                margin="dense"
                placeholder="03/2020"
                name="expiry_date"
                variant="outlined"
              />
              <TextField
                className="textField"
                error={this.state.amount_error}
                name="amount"
                onChange={e => this.handleChange(e)}
                label="amount"
                margin="dense"
                variant="outlined"
              />
              <Button type="submit" opacity={this.state.working ? 0.5 : 1} disabled={this.state.donated}>{this.state.working ? 'Working...' : 'Donate now'}</Button>
            </form>
          </div>
        </div>
        <NotificationContainer/>

      </div>
    );
  }
}

const styles = {
    smallInput:{
        width:"50%"
    }
}

export default PostDonate;
