import React, { Component, Fragment } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';

//Queries
import { Mutation } from 'react-apollo';
import { CREATE_MOBILITY } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';

const initialState = {
    department: '',
    day: ''
}

class CreateFormMobility extends Component {
    state = { 
        department: '',
        day: this.props.day
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
            [name]: value
        });
    }

    //Validate Form
    validateForm = () => {
        const { department, day } = this.state;
        const noValid = !department || !day;
        return noValid;
    }

    //Show Options Department
    getDepartmentsSquare = (department) => {
        this.setState({
            department
        });
    }

    //Create Mobility
    createNewMobility = (e, newMobility) => {
        e.preventDefault();

        //New Machine at Database
        newMobility().then(data => {
            this.cleanState();
        });

        this.props.history.push('/movilidad')
    }

    render() { 

        //Function Destructuring
        const { day } = this.state;

        const departmentInput = this.state.department.id

        const input = {
            day,
            department: departmentInput
        }

        return ( 
            <Fragment>
                <div className="row justify-content-center">

                    <Mutation
                        mutation={CREATE_MOBILITY}
                        variables={{input}}
                    >
                    {(newMobility, {loading, error, data}) => {

                        return (
                            <form
                                className="col-md-8"
                                onSubmit={e => this.createNewMobility(e, newMobility)}

                            >
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

                                <div className="form-group">
                                    <label>Día: </label>
                                    <input 
                                        type="text"
                                        name="day"
                                        className="form-control"
                                        placeholder="Ingrese el día"
                                        autoComplete="off"
                                        spellCheck="false"
                                        defaultValue={this.props.day}
                                        onChange={this.updateState}
                                        disabled
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success float-right font-weight-bold"
                                    disabled={this.validateForm()}
                                >
                                    <Icon icon={floppyDisk} /> Crear Registro
                                </button>

                            </form>
                        );

                    }}
                    </Mutation>

                </div>
            </Fragment>
        );
    }
}
 
export default withRouter(CreateFormMobility);