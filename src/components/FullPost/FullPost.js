import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    async componentDidUpdate() {
        if (this.props.id) {
            if (this.state.loadedPost && this.state.loadedPost.id === this.props.id) {
                return;
            }
            const postRes = await axios.get(`/posts/${this.props.id}`);
            const loadedPost = postRes.data;
            // const authorRes = await axios.get(`http://jsonplaceholder.typicode.com/users/${post.userId}`);
            // const author = authorRes.data;
            this.setState({ loadedPost });
        }
    }

    deletePostHandler = async () => {
        const res = await axios.delete(`/posts/${this.props.id}`);
        console.log(res);
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.state.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            // if (this.props.post) {
            // Passing the post from the array in Blog component did work well
            // He wanted to use axios as another opportunity to show making a request.
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;