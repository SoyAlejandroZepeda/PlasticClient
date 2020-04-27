import React, { Component, Fragment } from 'react';
    import makeAnimated from 'react-select/animated';
    import Select from 'react-select';
    import { Link, withRouter } from 'react-router-dom';

//Import Mutations
import { Mutation } from 'react-apollo';
import { CREATE_MACHINE } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

const initialState = {
    machineNumber: '',
    square: ''
}

class CreateFormMachine extends Component {
    state = { 
        ...initialState
    }

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

    //Create New Machine
    createNewMachine = (e, newMachine) => {
        e.preventDefault();

        //New Machine at Database
        newMachine().then(data => {
            this.cleanState();

            this.props.history.push('/movilidad/departamentos');
        });
    }

    render() { 

        //Function Destructuring
        const { machineNumber } = this.state;

        const squareInput = this.state.square.id;

        const input = {
            machineNumber,
            square: squareInput
        }

        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Crear Máquina</h2>

                <div className="row justify-content-center">

                    <Mutation
                        mutation={CREATE_MACHINE}
                        variables={{input}}
                    >
                    {(newMachine, {loading, error, data}) => {


                        return (

                            <form
                                className="col-md-8"
                                onSubmit={e => this.createNewMachine(e, newMachine)}
                            >

                                <div className="form-group">
                                    <label>Número o Nombre de Máquina: </label>
                                    <input 
                                        type="text"
                                        name="machineNumber"
                                        className="form-control"
                                        placeholder="Ingrese el número o nombre de la máquina"
                                        autoComplete="off"
                                        spellCheck="false"
                                        onChange={this.updateState}
                                        autoFocus
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Bloque: </label>
                                    <Select 
                                        onChange={this.getAllSquares}
                                        options={this.props.square}
                                        components={makeAnimated()}
                                        placeholder={'Eliga un número de bloque'}
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
                                    <Icon icon={floppyDisk} /> Crear Máquina
                                </button>

                                <Link to={'/movilidad/departamentos'} className="btn btn-danger float-right font-weight-bold mr-2">
                                    <Icon icon={cross} /> Cancelar
                                </Link>

                            </form>

                        );

                    }}

                    </Mutation>

                </div>
            </Fragment>
        );
    }
}
 
export default withRouter(CreateFormMachine);