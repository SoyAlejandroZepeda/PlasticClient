import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

//Mutations
import { Mutation } from 'react-apollo';
import { CREATE_POSITION } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

//Initial State
const initialState = {
    positionName: '',
    typeWorker: '',
    costCenter: ''
}

class CreatePosition extends Component {

    //Take a Copy of initial State
    state = { 
        ...initialState
    }

    //Clean State when created department
    cleanState = () => {
        this.setState({
            ...initialState
        });
    }

    //Update State
    updateState = e => {
        const { name, value } = e.target;

        this.setState({
            [name] : value.toUpperCase(),
        });
    }

    //Validate Form
    validateForm = () => {
        const { positionName, typeWorker, costCenter } = this.state;
        const noValid = !positionName || !typeWorker || !costCenter;
        return noValid;
    }

    //Create a New Position
    createNewPosition = (e, newPosition) => {
        e.preventDefault()

        //New product at Database
        newPosition().then(data => {
            this.cleanState();

            //Redirection
            this.props.history.push('/puestos');
        });
    }

 
    render() { 

        //Function destructuring
        const { positionName, typeWorker, costCenter } = this.state;

        const input = {
            positionName,
            typeWorker,
            costCenter
        }


        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Crear Puesto</h2>

                <div className="row justify-content-center">


                    <Mutation
                        mutation={ CREATE_POSITION }
                        variables={{input}}
                    >
                    {(newPosition, {loading, error, data}) => {
                            
                        return(

                            <form 
                                className="col-md-8"
                                onSubmit={ e => this.createNewPosition(e, newPosition) }
                            >

                                <div className="form-group">
                                    <label>Nombre del puesto: </label>
                                    <input 
                                        type="text"
                                        name="positionName"
                                        className="form-control"
                                        placeholder="Ingrese el nombre del puesto"
                                        autoComplete="off"
                                        spellCheck="false"
                                        onChange={ this.updateState}
                                        autoFocus
                                    />
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Tipo de Trabajador: </label>
                                        <select
                                            className="form-control"
                                            
                                            onChange={e => {
                                                this.setState({
                                                    ...this.state,
                                                    typeWorker: e.target.value
                                                });
                                            }}
                                        >
                                            <option defaultValue="">Eliga un tipo de trabajador</option>
                                            <option value="NS">NS</option>
                                            <option value="S">S</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Centro de Costos: </label>
                                        <select
                                            className="form-control"
                                            onChange={e => {
                                                this.setState({
                                                    ...this.state,
                                                    costCenter: e.target.value
                                                });
                                            }}
                                        >
                                            <option defaultValue="">Eliga un centro de costos</option>
                                            <option value="SUELDOS">SUELDOS</option>
                                            <option value="MOI">MOI</option>
                                            <option value="MOD">MOD</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success float-right font-weight-bold"
                                    disabled={this.validateForm()}
                                >
                                    <Icon icon={floppyDisk} /> Crear Puesto
                                </button>

                                <Link to={'/puestos'} className="btn btn-danger float-right font-weight-bold mr-2">
                                    <Icon icon={cross} /> Cancelar
                                </Link>

                            </form>
                
                        )

                    }}
                    </Mutation>

                </div>

            </Fragment>
        );
    }
}
 
export default CreatePosition;