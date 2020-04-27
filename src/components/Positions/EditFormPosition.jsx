import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

//Mutations
import { Mutation } from 'react-apollo';
import { UPDATE_POSITION } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

//Initial State
const initialState = {
    departmentName: '',
    typeWorker: '',
    costCenter: ''
}

class EditFormPosition extends Component {

    //Take a copy of State
    state = { 
        ...this.props.position.getPosition
    }

    //Clean State when updated department
    cleanState = () => {
        this.setState({
            ...initialState
        });
    }

    //Update State
    updateState = e => {
        const {name, value} = e.target;

        this.setState({
            [name] : value.toUpperCase()
        });
    }

    //Validate Form
    validateForm = () => {
        const {positionName, typeWorker, costCenter} = this.state;
        const noValid = !positionName || !typeWorker || !costCenter;
        return noValid;
    }

    //Update Department
    editPositionForm = (e, updatePosition) => {
        e.preventDefault();

        updatePosition().then(data => {
            this.setState({
                ...initialState
            });
        });
    }

    render() { 

        const {positionName, typeWorker, costCenter} = this.state;
        const {id} = this.props

        const input = {
            id,
            positionName,
            typeWorker,
            costCenter
        }

        return ( 

            <Mutation
                mutation={ UPDATE_POSITION }
                variables={{input}}
                key={id}
                onCompleted={() => this.props.refetch().then(() => {
                    this.props.history.push('/puestos')
                })}
            >
                {(updatePosition, { loading, error, data }) => {
                    return (

                        <form 
                            className="col-md-8"
                            onSubmit={e => this.editPositionForm(e, updatePosition)}
                        >
                            <div className="form-group">
                                <label>Nombre del puesto: </label>
                                <input 
                                    type="text"
                                    name="positionName"
                                    className="form-control"
                                    placeholder="Nombre Puesto"
                                    autoComplete="off"
                                    spellCheck="false"
                                    defaultValue={ positionName }
                                    onChange={ this.updateState }
                                    autoFocus
                                />
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label>Tipo de trabajador: </label>
                                    <select
                                        className="form-control"
                                        defaultValue={ typeWorker }
                                        onChange={e => {
                                            this.setState({
                                                ...this.state,
                                                typeWorker: e.target.value
                                            });
                                        }}
                                    >
                                        <option defaultValue="">Elegir...</option>
                                        <option value="NS">NS</option>
                                        <option value="S">S</option>
                                    </select>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Centro de Costos: </label>
                                    <select
                                        className="form-control"
                                        defaultValue={ costCenter }
                                        onChange={e => {
                                            this.setState({
                                                ...this.state,
                                                costCenter: e.target.value
                                            });
                                        }}
                                    >
                                        <option defaultValue="">Elegir...</option>
                                        <option value="SUELDOS">SUELDOS</option>
                                        <option value="MOI">MOI</option>
                                        <option value="MOD">MOD</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success font-weight-bold float-right"
                                disabled={ this.validateForm() }
                            >
                                <Icon icon={floppyDisk} /> Guardar Cambios
                            </button>

                            <Link to={'/puestos'} className="btn btn-danger float-right font-weight-bold mr-2">
                                    <Icon icon={cross} /> Cancelar
                            </Link>

                        </form>
                    )
                }}
            </Mutation>

        );
    }
}
 
export default withRouter(EditFormPosition);