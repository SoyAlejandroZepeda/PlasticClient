import React, { Component, Fragment } from 'react'
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';

//Mutations
import { Mutation } from 'react-apollo';
import { CREATE_SQUARE } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

const initialState = {
    squareNumber: '',
    department: ''
}

class CreateFormSquare extends Component {
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
        const { squareNumber, department } = this.state;
        const noValid = !squareNumber || !department;
        return noValid;
    }

    //Show Options Departments
    getDepartmentsSquare = (department) => {
        this.setState({
            department
        });
    }

    //Create a New Square
    createNewSquare = (e, newSquare) => {
        e.preventDefault();

        //New Square at Database
        newSquare().then(data => {
            this.cleanState();

            this.props.history.push('/movilidad/departamentos');
        });
    }

    render() { 

        //Function destructuring
        const { squareNumber } = this.state;

        const departmentInput = this.state.department.id;

        const input = {
            squareNumber: Number(squareNumber),
            department: departmentInput
        }


        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Crear Bloque</h2>
                
                <div className="row justify-content-center">

                    <Mutation
                        mutation={CREATE_SQUARE}
                        variables={{input}}
                    >
                    {(newSquare, {loading, error, data}) => {
                        
                        return (

                            <form
                                className="col-md-8"
                                onSubmit={e => this.createNewSquare(e, newSquare)}
                            >
                                <div className="form-group">
                                    <label>Número de Bloque: </label>
                                    <input 
                                        type="number"
                                        name="squareNumber"
                                        className="form-control"
                                        placeholder="Ingrese el número de bloque"
                                        autoComplete="off"
                                        onChange={this.updateState}
                                        autoFocus
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Departamento: </label>
                                    <Select 
                                        onChange={this.getDepartmentsSquare}
                                        options={this.props.department}
                                        components={makeAnimated()}
                                        placeholder={'Eliga un departamento'}
                                        getOptionValue={(options) => options.id}
                                        getOptionLabel={(options) => options.departmentName}
                                        value={this.state.department}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success float-right font-weight-bold"
                                    disabled={this.validateForm()}
                                >
                                    <Icon icon={floppyDisk} /> Crear Bloque
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
 
export default withRouter(CreateFormSquare);