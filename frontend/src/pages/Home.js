import React, { Component } from 'react';
import {API_PREFIX,PUBLIC_URL} from '../utils/Dirs'
import checkRespone from '../utils/checkResponse'


class Home extends Component {

    state={
        allposts:[]
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        const URL = PUBLIC_URL + API_PREFIX + "problems/allposts"
        checkRespone(URL,"get").then(r=>{
            console.log(r.data)
            if(r.data){
                this.setState({allposts:r.data.allposts})
            }
        })
    }
    render() {
        return (
            <div>
                {this.state.allposts.map(post=>
                    <ul key={post.id}>{post.title}</ul>
                )}
            </div>
        )
            }
}

export default Home;