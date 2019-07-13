import React, { Component } from 'react';
import {API_PREFIX,PUBLIC_URL} from '../utils/Dirs'
import checkRespone from '../utils/checkResponse'

class PostView extends Component {
    state = {
        problem:{images:[]}
    }
    componentDidMount(){
        this._getProblem()
    }

    _getProblem(){
        const URL = PUBLIC_URL + API_PREFIX + 'problem/' + this.props.params.problemId
        checkRespone(URL,"get").then(r=>{
            this.setState({problem:r.data.problem})
        })
    }

    render() {
        return (
            <div className="formContainer">
                <h1>hey {this.state.problem.title}</h1>
                {this.state.problem.images.map(img=>{
                    return(
                        <div>
                            <img src={PUBLIC_URL + img}/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default PostView;