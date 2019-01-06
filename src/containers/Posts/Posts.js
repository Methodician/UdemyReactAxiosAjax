import React, { Component } from 'react';
import axios from '../../axios';
// import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Post from '../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        // selectedPostId: null,
        // error: null,
    }

    async componentDidMount() {
        console.log(this.props);
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
            console.log(error);
            // this.setState({ error: error.toString() });
        }
    }

    postSelectedHandler = (id) => {
        // the Push method allows you to basically push a new page onto the stack of pages
        // Navigation is basically a stack of pages.
        // There's also the "goBack()" and "goForwared()" methods which work just like browser buttons.
        this.props.history.push('/' + id);
        // this.props.history.push({ pathname: '/' + id }); (object alternative syntax probably more flexible)
        // this.setState({ selectedPostId: id });
    }

    render() {
        let posts = <div><p>Something went wrong</p><p>{this.state.error}</p></div>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>
                    // Using the link would be fine but we're demoing the programatic alternative
                    <Post
                        clicked={() => this.postSelectedHandler(post.id)}
                        key={post.id}
                        title={post.title}
                        author={post.author.name} />
                    // </Link>
                );
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path="/:id" exact component={FullPost} />
                {/* In case we wanted to route from something like "/posts" to "/:id"
                 the above wouldn't work so we could do this: */}
                {/* <Route path={this.props.match.url + '/:id'} exact component={FullPost} /> */}
            </div>
        );
    }
}

export default Posts;