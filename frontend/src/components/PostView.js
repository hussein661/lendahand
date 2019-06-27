import React, { Component } from 'react';
import {API_PREFIX,PUBLIC_URL} from '../utils/Dirs'
import checkRespone from '../utils/checkResponse'

class PostView extends Component {
    state = {
        problem:{}
    }
    componentDidMount(){
        this._getProblem()
    }

    _getProblem(){
        console.log(this.props)
        const URL = PUBLIC_URL + API_PREFIX + 'problem/' + this.props.params.problemId
        checkRespone(URL,"get").then(r=>{
            console.log(r)
            this.setState({problem:r.data.problem})
        })
    }

    render() {
        return (
            <div className="formContainer">
                <h1>hey {this.state.problem.title}</h1>
            </div>
        );
    }
}

export default PostView;