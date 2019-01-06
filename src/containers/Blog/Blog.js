import React, { Component } from 'react';
// import axios from 'axios'; (now importing our instance instead)
// import axios from '../../axios';
// import { Route, Link } from 'react-router-dom';
// NavLink is similar to Link but has extra props that allow some styling on active link.
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from '../Posts/Posts';
import NewPost from '../NewPost/NewPost';
import FullPost from '../FullPost/FullPost';

import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: null,
    }



    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <li><NavLink
                            activeClassName="my-active" // allows you to give a different class to active links
                            activeStyle={{ // allows you to use in-line styling for active instead of css (this isn't receiving style from my-active)
                                color: '#fa923f',
                                textDecoration: 'underline'
                            }}
                            exact
                            to="/">Home</NavLink></li>
                        <li><NavLink exact to="/new-post">Create</NavLink></li>
                        <li><NavLink exact to={{
                            pathname: '/new-post',
                            hash: '#submit',
                            search: '?quick-submit=true',
                        }}>Quick Submit</NavLink></li>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <Posts />} /> (This works but he says to use component. Why?) */}
                {/* <Route path="/" exact component={Posts} /> */}
                <Switch> {/* Switch tells it to only load one of the routes. Otherwise FullPost could load along with NewPost */}
                    <Redirect from="/posts" to="/" /> {/* You can use the redirect like this. His example was to redirect from '/' to '/posts' but I'm doing this for record */}
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/" component={Posts} />
                    {/* These routes are parsed from top to bottom. 
                If /new-post were after /:id, new-post would be treated as an id param
                However I tried this and it didn't interfere. Maybe an edge case...
                And it turned out that once we wrapped in Switch, this ordering became more relevant  */}
                    {/* <Route path="/:id" exact component={FullPost} /> (moving this to Posts.js) */}
                </Switch>
                <section>
                    {/* <FullPost id={this.state.selectedPostId} post={this.state.posts[this.state.selectedPostId]} /> */}
                    {/* <FullPost post={this.state.posts[this.state.selectedPostId]} /> (worked nicely but he wants to show more calls) */}
                </section>
            </div>
        );
    }
}

export default Blog;