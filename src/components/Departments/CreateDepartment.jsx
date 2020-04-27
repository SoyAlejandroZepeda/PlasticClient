import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

//Mutations
import { Mutation } from 'react-apollo';
import { CREATE_DEPARTMENT } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

//Initial State
const initialState = {
    departmentName: ''
}

class CreateDepartment extends Component {

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
        const { departmentName } = this.state;
        const noValid = !departmentName;
        return noValid;
    }

    //Create a New Department
    createNewDepartment = (e, newDepartment) => {
        e.preventDefault()

        //New product at Database
        newDepartment().then(data => {
            this.cleanState();

            //Redirection
            this.props.history.push('/departamentos');
        });
    }

 
    render() { 

        //Function destructuring
        const { departmentName } = this.state;

        const input = {
            departmentName
        }


        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Crear Departamento</h2>

                <div className="row justify-content-center">


                    <Mutation
                        mutation={ CREATE_DEPARTMENT }
                        variables={{input}}
                    >
                    {(newDepartment, {loading, error, data}) => {
                            
                        return(

                            <form 
                                className="col-md-8"
                                onSubmit={ e => this.createNewDepartment(e, newDepartment) }
                            >

                                <div className="form-group">
                                    <label>Nombre del departamento: </label>
                                    <input 
                                        type="text"
                                        name="departmentName"
                                        className="form-control"
                                        placeholder="Ingrese el nombre del departamento"
                                        autoComplete="off"
                                        spellCheck="false"
                                        onChange={ this.updateState }
                                        autoFocus
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success float-right font-weight-bold"
                                    disabled={this.validateForm()}
                                >
                                    <Icon icon={floppyDisk} /> Crear Departamento
                                </button>

                                <Link to={'/departamentos'} className="btn btn-danger float-right font-weight-bold mr-2">
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
 
export default CreateDepartment;