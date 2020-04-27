import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

//Import Mutations
import { Mutation } from 'react-apollo';
import { DELETE_MACHINE } from '../Mutations';

//Alert
import Successfully from '../Alerts/Successfully';

//Icons
import Icon from 'react-icons-kit';
import {pencil} from 'react-icons-kit/icomoon/pencil';
import {cross} from 'react-icons-kit/icomoon/cross';

class Machines extends Component {
    state = { 
        alert: {
            show: false,
            message: ''
        }
    }
    render() { 

        const square = this.props.square;
        const department = this.props.department;
        const {machine} = this.props;
        const {id} = this.props.machine;

        const date = new Date(Number(machine.register));
        const last = new Date(Number(machine.updated));

        const {alert: {show, message}} = this.state;
        const alert = (show) ? <Successfully message={message} /> : '';

        return ( 
            <Fragment>
                {alert}

                <div className="col-md-4">
                    <div className={`card mb-3`}>
                        <div className="card-body">
                            <p className="card-text font-weight-bold">ID de la máquina:
                                <span className="font-weight-normal"> {id} </span>
                            </p>
                            <p className="card-text font-weight-bold">Número de máquina:
                                <span className="font-weight-normal"> {machine.machineNumber} </span>
                            </p>
                            <p className="card-text font-weight-bold">Fecha de creación:
                                <span className="font-weight-normal"> {date.toLocaleString("es-MX")} </span>
                            </p>
                            <p className="card-text font-weight-bold">Ultima modificación:
                                <span className="font-weight-normal"> {last.toLocaleString("es-MX")} </span>
                            </p>

                            <Link to={`/movilidad/departamentos/${department}/bloques/${square}/maquinas/${id}/productos`}
                                className="btn btn-success font-weight-bold d-block mb-2"
                            >
                                Mostrar Productos
                            </Link>

                            <Link to={`/movilidad/departamentos/${department}/bloques/${square}/maquinas/${id}/operadores`}
                                className="btn btn-success font-weight-bold d-block mb-2"
                            >
                                Mostrar Operadores
                            </Link>

                            <Link to={`/maquinas/editar/${id}`}
                                className="btn btn-warning font-weight-bold d-block mb-2"
                            >
                                <Icon icon={pencil} />  Editar Máquina
                            </Link>

                            <Mutation
                                mutation={DELETE_MACHINE}
                                onCompleted={(data) => {
                                    this.setState({
                                        alert: {
                                            show: true,
                                            message: data.deleteMachine
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
                            {deleteMachine => (
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block font-weight-bold"
                                    onClick={() => {
                                        if(window.confirm('¿Desea eliminar esta máquina?')){
                                            deleteMachine({
                                                variables: {id}
                                            });
                                        }
                                    }}
                                >
                                    <Icon icon={cross} /> Eliminar Máquina
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
 
export default Machines;