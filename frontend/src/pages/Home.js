import React, { Component } from 'react';
import {API_PREFIX,PUBLIC_URL} from '../utils/Dirs'
import checkRespone from '../utils/checkResponse'
import SideBar from '../components/SideBar';
import Widgets from '../components/Widgets';
import Post from '../components/Post';


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
            if(r.data){
                this.setState({allposts:r.data.allposts})
            }
        })
    }

    render() {
        const {allposts} = this.state
        return (
            <div>
                <div className="main_header">
                    <h1>Welcome to lend a hand, powered by square</h1>
                </div>
            <div className="HomePageLayout">
                <SideBar />
                <div className="card-deck">
            {allposts.map(post =>                
                <Post post={post} history={this.props.history} />
                )}
                </div>
                <Widgets history={this.props.history} />
            </div>
                </div>
        )
            }
}

export default Home;