import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';

//Mutations
import { Mutation } from 'react-apollo';
import { UPDATE_DEPARTMENT } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

//Initial State
const initialState = {
    departmentName: ''
}

class EditFormDepartment extends Component {

    //Take a copy of State
    state = { 
        ...this.props.department.getDepartment
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
        const {departmentName} = this.state;
        const noValid = !departmentName;
        return noValid;
    }

    //Update Department
    editDepartmentForm = (e, updateDepartment) => {
        e.preventDefault();

        updateDepartment().then(data => {
            this.setState({
                ...initialState
            });
        });
    }

    render() { 

        const {departmentName} = this.state;
        const {id} = this.props

        const input = {
            id,
            departmentName
        }

        return ( 

            <Mutation
                mutation={ UPDATE_DEPARTMENT }
                variables={{input}}
                key={id}
                onCompleted={() => this.props.refetch().then(() => {
                    this.props.history.push('/departamentos')
                })}
            >
                {(updateDepartment, { loading, error, data }) => {
                    return (

                        <form 
                            className="col-md-8"
                            onSubmit={e => this.editDepartmentForm(e, updateDepartment)}
                        >
                            <div className="form-group">
                                <label>Nombre Departamento:</label>
                                <input 
                                    type="text"
                                    name="departmentName"
                                    className="form-control"
                                    placeholder="Nombre Departamento"
                                    autoComplete="off"
                                    spellCheck="false"
                                    defaultValue={ departmentName }
                                    onChange={ this.updateState }
                                    autoFocus
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-success font-weight-bold float-right"
                                disabled={ this.validateForm() }
                            >
                                <Icon icon={floppyDisk} /> Guardar Cambios
                            </button>

                            <Link to={'/departamentos'} className="btn btn-danger float-right font-weight-bold mr-2">
                                    <Icon icon={cross} /> Cancelar
                            </Link>
                        </form>
                    )
                }}
            </Mutation>

        );
    }
}
 
export default withRouter(EditFormDepartment);