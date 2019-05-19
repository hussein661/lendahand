import React, { Component } from 'react';
import {API_PREFIX,PUBLIC_URL} from '../utils/Dirs'
import checkRespone from '../utils/checkResponse'
import $ from "jquery"



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
        this.getme()
        this.getData()
    }



    getme(){
        const URL = PUBLIC_URL + API_PREFIX + "users/getone"
        checkRespone(URL,"get").then(r=>{
            if(r.data){
                this.setState({user:r.data.user})
            }
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

    deletePost = id =>{

        const URL = PUBLIC_URL + API_PREFIX + "problems/delete/" + id
        console.log(URL)
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
            console.log(r)
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
        <input type="text" defaultValue={post.title} onBlur={this.save}/>
            </div>
        )
    }


    render() {
        return (
            <div>
              <h1 style={{textAlign:"center"}}>welcome {this.state.user.first_name}</h1>
              <br/>
                <h1>my posts</h1>
                {this.state.myPosts.map(post=>(
                    <div>
                   <div>
                       {!this.state.editmode ? this.viewMode(post) : this.editmode(post)}
                   </div>
                   <h2>{post.title + " | " + post.amount + " | " + post.description}</h2>
                   {/* <button className="btn btn-secondary" onClick={e=>this.editing(e)}>edit</button> */}
                   <button className="btn btn-danger" onClick={_=>this.deletePost(post.id)}>deletePost</button>
                    </div>
                ))}
            </div>
        );
    }
}

export default Profile;