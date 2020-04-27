import React, { Component, Fragment } from 'react'
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';

//Mutations
import { Mutation } from 'react-apollo';
import { UPDATE_SQUARE } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

const initialState = {
    squareNumber: '',
    department: ''
}

class EditFormSquare extends Component {
    state = { 
        ...this.props.square.getSquare,
        departmentId: this.props.square.getSquare.department,
    }

    //Clean state
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
        const { squareNumber, department } = this.state
        const noValid = !squareNumber || !department;
        return noValid;
    }

    //Show Options Departments
    getDepartmentsSquare = (department) => {
        this.setState({
            department
        });
    }

    //Update Square
    updateSquareForm = (e, updateSquare) => {
        e.preventDefault();

        updateSquare().then(data => {
            this.setState({
                ...initialState
            });
        });
    }

    render() { 

        const { squareNumber } = this.state;
        const departmentInput = this.state.department.id;
        const {id} = this.props;

        const input = {
            id,
            squareNumber: Number(squareNumber),
            department: departmentInput
        }

        return ( 
            <Fragment>
                
                <Mutation
                    mutation={UPDATE_SQUARE}
                    variables={{input}}
                    key={id}
                    onCompleted={() => this.props.refetch().then(() => {
                        this.props.history.push(`/movilidad/departamentos`)
                    })}
                >
                {(updateSquare, {loading, error, data}) => {
                    return(

                        <form
                            className="col-md-8"
                            onSubmit={e => this.updateSquareForm(e, updateSquare)}
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
                                    defaultValue={ squareNumber }
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
 
export default withRouter(EditFormSquare);