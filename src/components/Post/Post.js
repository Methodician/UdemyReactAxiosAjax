import React from 'react';
// import { withRouter } from 'react-router-dom';
import './Post.css';

const post = (props) => {
    // console.log(props);
    return <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>;
};

// wrapping the export in the withRouter HOC provided by react-dom-router
// gives this component access to route info via props.
// export default withRouter(post);
export default post;