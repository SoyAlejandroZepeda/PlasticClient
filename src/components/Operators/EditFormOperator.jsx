import React, { Component, Fragment } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';

//Mutations
import { Mutation } from 'react-apollo';
import { UPDATE_EMPLOYEE } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

const initialState = {
    payroll: '',
    name: '',
    surnameP: '',
    surnameM: '',
    department: '',
    position: '',
    email: '',
    password: '',
    machine: '',
    birthday: ''
}

class EditFormOperator extends Component {
    state = { 
        ...this.props.employee
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
        const { machine } = this.state;
        const noValid = !machine;
        return noValid;
    }

    //Show Options Machine
    getAllMachines = (machine) => {
        this.setState({
            machine
        });
    }

    //Update Operator
    updateOperatorForm = (e, updateOperator) => {
        e.preventDefault();

        updateOperator().then(data => {
            this.setState({
                ...initialState
            })
        });
    }

    render() { 

        const machineInput = this.state.machine.id;
        const {id} = this.props;

        const input = {
            id,
            machine: machineInput
        }

        return ( 
            <Fragment>
                <Mutation
                    mutation={UPDATE_EMPLOYEE}
                    variables={{input}}
                    key={id}
                    onCompleted={() => this.props.refetch().then(() => {
                        this.props.history.push('/movilidad/operadores')
                    })}
                >
                {(updateOperator, {loading, error, data}) => {
                    return(

                        <form
                            className="col-md-8"
                            onSubmit={e => this.updateOperatorForm(e, updateOperator)}
                        >
                            <div className="form-group">
                                <label>Máquina: </label>
                                <Select 
                                    onChange={this.getAllMachines}
                                    options={this.props.machine}
                                    components={makeAnimated()}
                                    placeholder={'Eliga una máquina'}
                                    getOptionValue={(options) => options.id}
                                    getOptionLabel={(options) => options.machineNumber}
                                    value={this.state.machine}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success float-right font-weight-bold"
                                disabled={this.validateForm()}
                            >
                                <Icon icon={floppyDisk} /> Guardar Cambios
                            </button>

                            <Link to={'/movilidad/operadores'} className="btn btn-danger float-right font-weight-bold mr-2">
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
 
export default withRouter(EditFormOperator);