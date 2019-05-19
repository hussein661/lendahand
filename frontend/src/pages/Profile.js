import React, { Component } from 'react';
import {API_PREFIX,PUBLIC_URL} from '../utils/Dirs'
import checkRespone from '../utils/checkResponse'

class Profile extends Component {

    state = {
        myPosts:[],
        user:{}
    }
    componentDidMount(){
        this.getme()
        this.getData()
    }

    getme(){
        const URL = PUBLIC_URL + API_PREFIX + "users/getone"
        checkRespone(URL,"get").then(r=>{
            this.setState({user:r.data.user})
        })
    }

    getData(){
        const URL = PUBLIC_URL + API_PREFIX + "problems/myposts"
        checkRespone(URL,"get").then(r=>{
            console.log(r)
            if(r.data){
                this.setState({myPosts:r.data.myPosts})
            }
        })
    }

    render() {
        return (
            <div>
              <h1 style={{textAlign:"center"}}>welcome {this.state.user.first_name}</h1>
              <br/>
                <h1>my posts</h1>
                {this.state.myPosts.map(post=>(
                    <div>
                   <h2>{post.title + " | " + post.amount + " | " + post.description}</h2>
                    </div>
                ))}
            </div>
        );
    }
}

export default Profile;