import React, { Component, Fragment } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';

//Mutations
import {Mutation} from 'react-apollo';
import { CREATE_EMPLOYEE } from '../Mutations';

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

class CreateFormEmployee extends Component {
    state = { 
        ...initialState
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
        const { payroll, name, surnameP, department, position, password, birthday } = this.state;
        const noValid = !payroll || !name || !surnameP || !department || !position || !password || !birthday
        return noValid;
    }

    //Show Options Department
    getDepartments = (department) => {
        this.setState({
            department
        });
    }

    //Show Options Position
    getPositions = (position) => {
        this.setState({
            position
        });
    }

    //Create New Employee
    createNewEmployee = (e, newEmployee) => {
        e.preventDefault();

        //New Employee At Database
        newEmployee().then(data => {
            this.cleanState();

            //Redirection to Employees
            this.props.history.push('/empleados')
        });
    }

    render() {
        
        //Function destructuring
        const { payroll, name, surnameP, surnameM, email, password, machine, birthday } = this.state;

        const departmentInput = this.state.department.id;
        const positionInput = this.state.position.id;

        const input = {
            payroll: Number(payroll),
            name,
            surnameP,
            surnameM,
            email,
            department: departmentInput,
            position: positionInput,
            password,
            machine,
            birthday
        }

        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Crear Empleado</h2>

                <div className="row justify-content-center">

                    <Mutation
                        mutation={CREATE_EMPLOYEE}
                        variables={{input}}
                    >
                    {(newEmployee, {loading, error, data}) => {

                        return(

                            <form
                                className="col-md-8"
                                onSubmit={e => this.createNewEmployee(e, newEmployee)}
                            >
                                <div className="row">
                                    <div className="form-group col-md-5">
                                        <label>* Número de Nómmina: </label>
                                        <input 
                                            type="number"
                                            name="payroll"
                                            className="form-control"
                                            placeholder="Ingrese el número de nómina"
                                            autoComplete="off"
                                            onChange={this.updateState}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="form-group col-md-7">
                                        <label>* Nombre: </label>
                                        <input 
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Ingrese el nombre del empleado"
                                            autoComplete="off"
                                            spellCheck="false"
                                            onChange={this.updateState}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>* Apellido Paterno: </label>
                                        <input 
                                            type="text"
                                            name="surnameP"
                                            className="form-control"
                                            placeholder="Ingrese el apellido parterno del empleado"
                                            autoComplete="off"
                                            spellCheck="false"
                                            onChange={this.updateState}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Apellido Materno: </label>
                                        <input 
                                            type="text"
                                            name="surnameM"
                                            className="form-control"
                                            placeholder="Ingrese el apellido materno del empleado"
                                            autoComplete="off"
                                            spellCheck="false"
                                            onChange={this.updateState}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>* Departamento: </label>
                                        <Select 
                                            onChange={this.getDepartments}
                                            options={this.props.department}
                                            components={makeAnimated()}
                                            placeholder={'Eliga un departamento'}
                                            getOptionValue={(options) => options.id}
                                            getOptionLabel={(options) => options.departmentName}
                                            value={this.state.department}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>* Puesto: </label>
                                        <Select 
                                            onChange={this.getPositions}
                                            options={this.props.position}
                                            components={makeAnimated()}
                                            placeholder={'Eliga un puesto'}
                                            getOptionValue={(options) => options.id}
                                            getOptionLabel={(options) => options.positionName}
                                            value={this.state.position}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Correo Electronico Bocar: </label>
                                    <input 
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Ingrese el correo electronico Bocar"
                                        autoComplete="off"
                                        spellCheck="false"
                                        onChange={this.updateState}
                                    />
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>* Contraseña: </label>
                                        <input 
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Ingrese una contraseña"
                                            autoComplete="off"
                                            onChange={this.updateState}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>* Fecha de Cumpleaños: </label>
                                        <input 
                                            type="date"
                                            name="birthday"
                                            className="form-control"
                                            placeholder="Ingrese la fecha de nacimiento"
                                            autoComplete="off"
                                            onChange={this.updateState}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success float-right font-weight-bold"
                                    disabled={this.validateForm()}
                                >
                                    <Icon icon={floppyDisk} /> Crear Empleado
                                </button>

                                <Link to={'/empleados'} className="btn btn-danger float-right font-weight-bold mr-2">
                                    <Icon icon={cross} /> Cancelar
                                </Link>

                                <p className="text-danger">* Campos Obligatorios</p>

                            </form>

                        );

                    }}

                    </Mutation>

                </div>
            </Fragment>
        );
    }
}
 
export default withRouter(CreateFormEmployee);