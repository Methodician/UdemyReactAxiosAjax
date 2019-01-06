import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount() {
        // async componentDidUpdate() {
        // Updating occurs when things change, but now we're actually loading it to the DOM so it mounts.
        // now we also want to update upon change, so adding back in didUpdate
        this.loadData();
    }
    componentDidUpdate() {
        this.loadData();
    }

    async loadData() {
        console.log(this.props);
        if (this.props.match.params.id) {
            const postId = this.props.match.params.id;
            if (this.state.loadedPost && this.state.loadedPost.id === +postId) {
                // In this case the postId is actually a strig but this.state.loadedPost.id is a number
                // We can use "==" non-strict check to cooerce the types or just make it a number with "+"
                return;
            }
            const postRes = await axios.get(`/posts/${postId}`);
            const loadedPost = postRes.data;
            // const authorRes = await axios.get(`http://jsonplaceholder.typicode.com/users/${post.userId}`);
            // const author = authorRes.data;
            this.setState({ loadedPost });
        }
    }

    deletePostHandler = async () => {
        const res = await axios.delete(`/posts/${this.props.match.params.id}`);
        console.log(res);
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.match.params.id) {
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