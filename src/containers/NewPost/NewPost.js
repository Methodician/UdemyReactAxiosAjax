import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Jacob',
        submitted: false,
    }

    componentDidMount() {
        console.log(this.props);
    }

    submitPostHandler = async () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author,
        }
        const res = await axios.post('/posts', post);
        console.log(res)
        // this.setState({ submitted: true });
        // Instead of conditionally rendering the redirect, we can just use:
        this.props.history.push('/');
        // This also makes the back button work. Redirect doesn't, which could be useful in some cases but usually I think not.
        // Then again he also points out we can use "replace" for the same effect:
        // this.props.history.replace('/');
    }

    render() {
        return (
            <div className="NewPost">
                {/* We can just render the redirect conditionally and have it send us to wherever we want to be... */}
                {this.state.submitted ? <Redirect to="/" /> : null}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                    <option value="Jacob">Jacob</option>
                </select>
                <button onClick={this.submitPostHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;