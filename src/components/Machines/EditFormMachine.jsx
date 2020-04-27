import React, { Component, Fragment } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';

//Mutations
import { Mutation } from 'react-apollo';
import { UPDATE_MACHINE } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

const initialState = {
    machineNumber: '',
    square: ''
}

class EditFormMachine extends Component {
    state = { 
        ...this.props.machine.getMachine,
        squareId: this.props.machine.getMachine.square
    }

    //Clean State
    cleanState = () => {
        this.setState({
            ...initialState
        });
    }

    //Update State
    updateState = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value.toUpperCase()
        });
    }

    //Validate Form
    validateForm = () => {
        const { machineNumber, square } = this.state;
        const noValid = !machineNumber || !square;
        return noValid;
    }

    //Show Options Squares
    getAllSquares = (square) => {
        this.setState({
            square
        });
    }

    //Update Machine
    updateMachineForm = (e, updateMachine) => {
        e.preventDefault();

        updateMachine().then(data => {
            this.setState({
                ...initialState
            });
        });
    }

    render() { 

        const { machineNumber } = this.state;
        const squareInput = this.state.square.id;
        const {id} = this.props;

        const input = {
            id,
            machineNumber,
            square: squareInput
        }

        return ( 
            <Fragment>
                
                <Mutation
                    mutation={UPDATE_MACHINE}
                    variables={{input}}
                    key={id}
                    onCompleted={() => this.props.refetch().then(() => {
                        this.props.history.push('/movilidad/departamentos')
                    })}
                >
                {(updateMachine, {loading, error, data}) => {
                    return(
                        <form
                            className="col-md-8"
                            onSubmit={e => this.updateMachineForm(e, updateMachine)}
                        >
                            <div className="form-group">
                                <label>Número de Máquina: </label>
                                <input
                                    type="text"
                                    name="machineNumber"
                                    className="form-control"
                                    placeholder="Ingrese el número de máquina"
                                    autoComplete="off"
                                    spellCheck="false"
                                    onChange={this.updateState}
                                    defaultValue={ machineNumber }
                                    autoFocus
                                />
                            </div>

                            <div className="form-group">
                                <label>Bloque: </label>
                                <Select
                                    onChange={this.getAllSquares}
                                    options={this.props.square}
                                    components={makeAnimated()}
                                    placeholder={'Eliga un bloque'}
                                    getOptionValue={(options) => options.id}
                                    getOptionLabel={(options) => "Bloque " + options.squareNumber}
                                    value={this.state.square}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success float-right font-weight-bold"
                                disabled={this.validateForm()}
                            >
                                <Icon icon={floppyDisk} /> Guardar Cambios
                            </button>

                            <Link to={`/movilidad/departamentos`} className="btn btn-danger float-right font-weight-bold mr-2">
                                <Icon icon={cross} /> Cancelar
                            </Link>

                        </form>
                    );
                }}

                </Mutation>

            </Fragment>
        );
    }
}
 
export default withRouter(EditFormMachine);