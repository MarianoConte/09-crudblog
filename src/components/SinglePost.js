import React, { Component } from 'react';

class SinglePost extends Component {

    mostrarPost = (props) =>{
        const {title, userId, body} = this.props.post;
        if(!props.post) return null;

        return(
            <React.Fragment>
                <h1>{title}</h1>
                <p>Autor: {userId}</p>
                <p>{body}</p>
            </React.Fragment>
        )
    }


    render() {
     
        return (
            <div className="col-12 col-md-8">
                {this.mostrarPost(this.props)}
            </div>
        );
    }
}

export default SinglePost;