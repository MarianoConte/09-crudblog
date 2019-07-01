import React, { Component } from 'react';


class Editar extends Component {

    tituloRef = React.createRef();
    entradaRef = React.createRef();

    editarPost= (e) =>{
        e.preventDefault();

        const post = {
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId: 1,
            id: this.props.post.id
        }
        
        console.log(post);

        this.props.editar(post);

    }
    cargarFormulario = () =>{

        if(!this.props.post) return null;

        const{title, body} = this.props.post;
        return(
            <form onSubmit={this.editarPost} className="col-8">
                <legend className = "text-center">Editar Post</legend>
                <div className = "form-group">
                    <label>Titulo del Post</label>
                    <input type="text" defaultValue={title} ref={this.tituloRef} className="form-control" placeholder="Titulo del post"/>
                </div>
                <div className = "form-group">
                    <label>Contenido: </label>
                    <textarea className="form-control" defaultValue={body} ref={this.entradaRef} placeholder="Contenido"/>
                </div>
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </form>
        )
    }
    render() {

       

        return (
            <React.Fragment>
                {this.cargarFormulario()}
            </React.Fragment>
        );
    }
}

export default Editar;