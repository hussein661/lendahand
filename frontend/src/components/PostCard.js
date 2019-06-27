import React from 'react';
import {Button,Link} from './common'


const PostCard = ({post,deletePost,history}) => {
    return (
        <div>
                <Link onClick={_=>history.push('/problem/' + post.id)}>
                    {post.title}
                </Link>
                <div>
                    <ul type="none" style={{textAlign:"left"}}>
                       <li>{post.needed_amount}</li>
                       <li>{post.description}</li> 
                    </ul>
                </div>
                   <Button onClick={_=>deletePost(post.id)} background="#f74444" width={100}>
                       delete
                   </Button>
        </div>
    );
};

export default PostCard;