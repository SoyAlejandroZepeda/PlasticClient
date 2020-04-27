import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';

//Import Mutations
import { Mutation } from 'react-apollo';
import { DELETE_SQUARE } from '../Mutations';

//Alert
import Successfully from '../Alerts/Successfully';

//Icons
import Icon from 'react-icons-kit';
import {pencil} from 'react-icons-kit/icomoon/pencil';
import {cross} from 'react-icons-kit/icomoon/cross';

class Squares extends Component {
    state = { 
        alert: {
            show: false,
            message: ''
        }
    }
    render() { 

        const department = this.props.department;

        const {square} = this.props;

        const {id} = this.props.square;

        const date = new Date(Number(square.register));
        const last = new Date(Number(square.updated));

        const {alert: {show, message}} = this.state;
        const alert = (show) ? <Successfully message={message} /> : '';


        return ( 
            
            <Fragment>

                {alert}

                <div className="col-md-4">
                    <div className={`card mb-3`} >
                        <div className="card-body">
                            <p className="card-text font-weight-bold">ID del bloque:
                                <span className="font-weight-normal"> {id} </span>
                            </p> 
                            <p className="card-text font-weight-bold">Número de bloque: 
                                <span className="font-weight-normal"> {square.squareNumber} </span>
                            </p>

                            <p className="card-text font-weight-bold">Fecha de creación: 
                                <span className="font-weight-normal"> {date.toLocaleString("es-MX")} </span>
                            </p>

                            <p className="card-text font-weight-bold">Ultima modificación: 
                                <span className="font-weight-normal"> {last.toLocaleString("es-MX")} </span>
                            </p>
                            
                            <Link to={`/movilidad/departamentos/${department}/bloques/${id}/maquinas`} 
                                className="btn btn-primary font-weight-bold d-block mb-2"
                                department={department}
                            >
                                Mostrar Maquinas
                            </Link>

                            <Link to={`/bloques/editar/${square.id}`} className="btn btn-warning font-weight-bold d-block mb-2">
                                <Icon icon={pencil} />  Editar Bloque
                            </Link>

                            <Mutation
                                mutation={DELETE_SQUARE}
                                onCompleted={(data) => {
                                    this.setState({
                                        alert: {
                                            show: true,
                                            message: data.deleteSquare
                                        }
                                    }, () => {
                                        setTimeout(() => {
                                            this.setState({
                                                alert: {
                                                    show: false,
                                                    message: ''
                                                }
                                            });
                                        }, 3000);
                                    });
                                }}
                            >
                            {deleteSquare => (
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block font-weight-bold"
                                    onClick={() => {
                                        if(window.confirm('¿Desea eliminar este bloque?')){
                                            deleteSquare({
                                                variables: {id}
                                            });
                                        }
                                    }}
                                >
                                    <Icon icon={cross} /> Eliminar Bloque
                                </button>
                            )}

                            </Mutation>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default Squares;