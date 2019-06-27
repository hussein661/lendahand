import React, { Component } from 'react';

class PostsList extends Component {
    render() {
        return (
            <div>
              {this.props.allposts.map(post=>
                    <ul key={post.id}>{post.title}</ul>
                )}
            </div>
        );
    }
}

export default PostsList;