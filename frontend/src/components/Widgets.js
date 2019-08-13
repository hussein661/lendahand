import React, { Component } from 'react';
import checkResponse from '../utils/checkResponse';
import {PUBLIC_URL,API_PREFIX} from '../utils/Dirs'

class Widgets extends Component {


    state={
        donations:[]
    }

    componentDidMount(){
        this.getDonations()
    }
    getDonations = ()=>{
        const URL = PUBLIC_URL + API_PREFIX + 'donations/list'
        checkResponse(URL,'get').then(r=>{
            console.log(r)
            this.setState({donations:r.data.donations})
        })
    }

    getRecentDonations = ()=>{
        return (
            <div>
                <ul>
                    {this.state.donations.map(don=>
                        <li>`<b style={{cursor:'pointer'}} onClick={_=>this.props.history.push('user/' + don.user_id)}>{don.donor_firstName}</b>has donated an amount of ${don.amount} for RECEIVER`</li>
                        )}
                </ul>
            </div>
                //   "users.first_name as donor_firstName",
                //   "users.last_name as donor_lastName",
                //   "users.mobile as donor_mobile",
                //   "users.id as donor_id",
                //   "users.email as donor_email",
                //   "problems.id as problem_id",
                //   "problems.title as problem_title",
        )
    }
    render() {
        return (
            <div>
            <div className='main_widget'>
                WIDGETS
            {this.getRecentDonations()}
            </div>
            </div>
        );
    }
}

export default Widgets;