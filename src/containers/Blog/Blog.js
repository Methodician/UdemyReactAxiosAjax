import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: null,
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/posts/');
            const posts = res.data.slice(0, 4);
            // I really need to remember how I used Promise.all here!
            const updatedPosts = await Promise.all(posts.map(async post => {
                const res = await axios.get(`/users/${post.userId}`);
                return { ...post, author: res.data };
            }));
            this.setState({ posts: updatedPosts });
        } catch (error) {
            this.setState({ error: error.toString() });
        }
    }


    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = <div><p>Something went wrong</p><p>{this.state.error}</p></div>;
        if (!this.state.error) {
            posts = this.state.posts.map(post =>
                <Post
                    clicked={() => this.postSelectedHandler(post.id)}
                    key={post.id}
                    title={post.title}
                    author={post.author.name} />
            );
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} post={this.state.posts[this.state.selectedPostId]} />
                    {/* <FullPost post={this.state.posts[this.state.selectedPostId]} /> (worked nicely but he wants to show more calls) */}
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;