import React, { Component, Fragment } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';

//Mutations
import { Mutation } from 'react-apollo';
import { CREATE_PRODUCT } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

const initialState = {
    productName: '',
    partNumber: '',
    machine: ''
}

class CreateFormProduct extends Component {
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
        const { productName, partNumber, machine } = this.state;
        const noValid = !productName || !partNumber || !machine
        return noValid;
    }

    //Show Options Machine
    getAllMachines = (machine) => {
        this.setState({
            machine
        });
    }

    //Create New Product
    createNewProduct = (e, newProduct) => {
        e.preventDefault();

        //New Product At Database
        newProduct().then(data => {
            this.cleanState();

            //Redirection to Mobility
            this.props.history.push('/movilidad/departamentos');
        });
    }

    render() { 

        //Function Destructuring
        const { productName, partNumber } = this.state;

        const machineInput = this.state.machine.id;
        
        const input = {
            productName,
            partNumber,
            machine: machineInput
        }

        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Crear Producto</h2>

                <div className="row justify-content-center">

                    <Mutation
                        mutation={CREATE_PRODUCT}
                        variables={{input}}
                    >
                    {(newProduct, {loading, error, data}) => {

                        return(

                            <form
                                className="col-md-8"
                                onSubmit={e => this.createNewProduct(e, newProduct)}
                            >
                                <div className="form-group">
                                    <label>Nombre del Producto: </label>
                                    <input 
                                        type="text"
                                        name="productName"
                                        className="form-control"
                                        placeholder="Ingrese el nombre del producto"
                                        autoComplete="off"
                                        spellCheck="false"
                                        onChange={this.updateState}
                                        autoFocus
                                    />
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Número de Parte: </label>
                                        <input 
                                            type="text"
                                            name="partNumber"
                                            className="form-control"
                                            placeholder="Ingrese el número de parte del producto"
                                            autoComplete="off"
                                            spellCheck="false"
                                            onChange={this.updateState}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">   
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
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success float-right font-weight-bold"
                                    disabled={this.validateForm()}
                                >
                                    <Icon icon={floppyDisk} /> Crear Producto
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
 
export default withRouter(CreateFormProduct);