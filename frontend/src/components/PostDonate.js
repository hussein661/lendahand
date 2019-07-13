import React, { Component } from 'react';

class PostDonate extends Component {

    state = {
        calledPost:{}
    }
    componentWillMount() {
        this.setState({calledPost:this.props.location.state})
    }
    
    render() {
        console.log(this.state.calledPost)
        return (
            <div>
                welcome to donate page
            </div>
        );
    }
}

export default PostDonate;