import React, { Component } from 'react';
import {API_PREFIX,PUBLIC_URL} from '../utils/Dirs'
import checkRespone from '../utils/checkResponse'
import $ from "jquery"
import { Button, Link,Header } from '../components/common';
import PostCard from '../components/PostCard';
import ProfileLayout from './ProfileLayout'



class Profile extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            myPosts:[],
            user:{},
            editmode:false
        }
          this.focus = React.createRef();
    }


    componentDidMount(){
        this.getUser()
        this.getData()
    }

    getUser(){
        const URL = PUBLIC_URL + API_PREFIX + "users/getone/" + this.props.params.user_id
        checkRespone(URL,"get").then(r=>{
            if(r.data){
                this.setState({user:r.data.user})
            }
        })
    }


    getData(){
        const URL = PUBLIC_URL + API_PREFIX + "problems/myposts/" + this.props.params.user_id
        checkRespone(URL,"get").then(r=>{
            if(r.data){
                this.setState({myPosts:r.data.myPosts})
            }
        })
    }

    deletePost = id =>{

        const URL = PUBLIC_URL + API_PREFIX + "problems/delete/" + id
        checkRespone(URL,"delete").then(r=>{
            if(r.data.message){
                var  myPosts = [...this.state.myPosts]
                myPosts =  myPosts.filter(post =>(
                    post.id !== id
                )
                )
                this.setState({myPosts})
            }
        })
    }

    changeEditMode = () =>{
        this.setState({editmode:!this.state.editmode})
        if(this.state.editmode == true){
            this.focus.focus()
        }
    }


    editPost = id =>{
        const URL = PUBLIC_URL + API_PREFIX + "problems/edit/"+id
        const data = {
            title:"updated title"
        }
        checkRespone(URL,"put",data)
        .then(r=>{
            if(r.data){
                alert("updated")
                this.getData()
            }
        })
    }

    viewMode = (post) =>{
        return (
        <div>
        <h5 onDoubleClick={this.changeEditMode} ref={this.focus}>{post.title}</h5>
        </div>
        )
    }
    editmode = (post) =>{
        return (
            <div>
        <input type="text" defaultValue={post.title} onBlur={e=>this.save(e,post)}/>
            </div>
        )
    }

    save = (e,post) => {
        const postid = post.id
        const URL = PUBLIC_URL +  API_PREFIX  + "problems/edit/" + postid
        const title = e.target.value
        checkRespone(URL,"put",{title}).then(
            r=>{
                 this.changeEditMode()
                if(r.data){
                    const myPosts = [...this.state.myPosts]
                    myPosts.map(pos =>{
                        if(pos.id == postid){ 
                            pos.title = title
                        }
                    this.setState({myPosts})
                    })
                  return  
                }
                return 
            }
         )
    }
    render() {
        return (
            <div>
              <Header>
                  {/* welcome {this.state.user.first_name} */}
                  </Header> 
                        <ProfileLayout profile={{...this.state}} history={this.props.history}/>
            </div>
        );
    }
}

export default Profile;