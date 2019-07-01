import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2';
import Header from './Header';
import Navegacion from './Navegacion';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Formulario from './Formulario';
import Editar from './Editar';

class Router extends Component {
    
    state={
        posts: []
    }

    componentDidMount(){
        this.obtenerPost();
    }

    obtenerPost = () =>{
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then(respuesta =>{
            this.setState({
                posts: respuesta.data
            })
        })
    }

    borrarPost = (id) =>{
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res=>{
            if(res.status === 200){
                const posts = [...this.state.posts];
                let resultado = posts.filter(post=>(
                    post.id != id
                ));
                this.setState({
                    posts: resultado
                })
            }
        })
    }

    editar = (postActualizado) =>{
        const {id} = postActualizado;
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {postActualizado})
        .then(res=>{
            if(res.status === 200){
                
                console.log(res);
                let postId =  res.data.id; //tomamos el id del post
             
                const posts = [...this.state.posts]; //tomamos una copia del state
                
                const postEditar = posts.findIndex(post => postId === post.id); //buscamos el post con ese id

                posts[postEditar] = postActualizado; //ese post va a ser igual al post editado

                this.setState({
                    posts //actualizamos el state
                })

                Swal.fire(
                    'Good job!',
                    'Blog actualizado!',
                    'success'
                  )
            }
        })
    }

    crearPost = (post) =>{
        axios.post(`https://jsonplaceholder.typicode.com/posts`, {post})
        .then(res=>{
            if(res.status === 201){
                Swal.fire(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                  )
                let postId = {id: res.data.id};
                const nuevoPost = Object.assign({}, res.data.post, postId);
                this.setState(prevState => ({
                    posts: [...prevState.posts, nuevoPost]
                }))
            }
        })
    }
    
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header />
                        <Navegacion />
                        <Switch>
                            <Route exact path="/" 
                            render={() => {
                                return(
                                    <Posts
                                    posts={this.state.posts}
                                    borrarPost = {this.borrarPost}
                                    />
                                )
                            }}
                            />
                            <Route exact path="/post/:postId" render={(props) =>{
                               let idPost = props.location.pathname.replace('/post/', '');

                               const posts=this.state.posts;

                               let filtro;

                               filtro = posts.filter(post => (
                                   post.id === Number(idPost)
                               ))
                               return(
                                   <SinglePost 
                                    post={filtro[0]}
                                    />
                                   )
                            }}
                            />
                            <Route exact path="/editar/:postId" render={(props) =>{
                               let idPost = props.location.pathname.replace('/editar/', '');

                               const posts=this.state.posts;

                               let filtro;

                               filtro = posts.filter(post => (
                                   post.id === Number(idPost)
                               ))
                               return(
                                   <Editar 
                                    post={filtro[0]}
                                    editar={this.editar}
                                    />
                                   )
                            }}
                            />
                            <Route exact path="/crear" render={() => {
                                return(
                                    <Formulario
                                    crearPost = {this.crearPost}
                                    />
                                )
                            }}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;