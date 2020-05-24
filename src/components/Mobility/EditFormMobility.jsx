import React, { Component, Fragment } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';
import MobilityTable from './MobilityTable';

//Import Queries
import { Query } from 'react-apollo';
import { GET_SQUARES, GET_MACHINES, GET_OPERATORS, GET_PRODUCTS, GET_MOBILITY } from '../Queries';

//Import Mutations
import { Mutation } from 'react-apollo';
import { UPDATE_MOBILITY } from '../Mutations';

//Icons
import Icon from 'react-icons-kit';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk';
import {cross} from 'react-icons-kit/icomoon/cross';

class EditFormMobility extends Component {
    state = { 
        week: this.props.mobility.getMobility.week,
        day: this.props.mobility.getMobility.day,
        department: this.props.mobility.getMobility.department,
        square: '',
        squares: [{}],
        machine: '',
        machines: [{}],
        operator: '',
        operators: [{}],
        product: '',
        products: [{}],
        indicator: '',
        indicators: [{indicator: ''}],
        observation: '',
        observations: [{observation: ''}]
    }

    //Clean State
    cleanState = () => {
        this.setState({
            ...this.state
        });
    }

    //Squares
    getSquares = (square) => {
        this.setState({
            square,
            squares: [square]
        });
    }

    //Machines
    getMachines = (machine) => {
        this.setState({
            machine,
            machines: [machine]
        });
    }

    //Operators
    getOperators = (operator) => {
        this.setState({
            operator,
            operators: [operator]
        });
    }

    //Products
    getProducts = (product) => {
        this.setState({
            product,
            products: [product]
        });
    }

    //Update State
    updateState = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    //Validate Form
    validateForm = () => {
        const {square, machine, indicator} = this.state;
        const noValid = !square || !machine || !indicator;
        return noValid
    }

    //Update Mobility
    updateMobilityForm = (e, updateMobility) => {
        e.preventDefault();

        updateMobility().then(data => {
            this.setState({
                square: '',
                squares: [{}],
                machine: '',
                machines: [{}],
                operator: '',
                operators: [{}],
                product: '',
                products: [{}],
                indicator: '',
                indicators: [{indicator: ''}],
                observation: '',
                observations: [{observation: ''}]
            });

            window.location.reload(true);
        });
    }

    render() {

        const {id} = this.props;
        const department = this.state.department;
        const square = this.state.square.id;
        const machine = this.state.machine.id;

        const { squares, machines, operators, products } = this.state;

        const { indicator, observation } = this.state;

        const input = {
            id, 
            squares,
            machines,
            operators,
            products,
            indicators: {indicator},
            observations: {observation}
        }

        return (
            <Fragment>

                <Query
                    query={GET_SQUARES}
                    variables={{department}}
                >
                {({loading, data, error, startPolling, stopPolling}) => {
                    if(loading) return 'Loading...';
                    if(error) return `Error: ${error.message}`;
                    const dataSquare = data.getSquares;

                    return(

                        <Mutation
                            mutation={UPDATE_MOBILITY}
                            variables={{input}}
                            key={id}
                        >
                        {(updateMobility, {loading, error, data}) => {

                            return(

                                <Fragment>

                                    <form
                                        onSubmit={e => this.updateMobilityForm(e, updateMobility)}
                                    >

                                        <table 
                                            className="table"         
                                        >
                                            <thead>
                                                <tr className="table-primary">
                                                    <th scope="col">Bloques</th>
                                                    <th scope="col">Máquinas</th>
                                                    <th scope="col">Operadores</th>
                                                    <th scope="col">Productos</th>
                                                    <th scope="col">Indicadores</th>
                                                    <th scope="col">Observaciones</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Select 
                                                        onChange={this.getSquares}
                                                        options={dataSquare}
                                                        components={makeAnimated()}
                                                        placeholder={'Bloques'}
                                                        getOptionValue={(options) => options.id}
                                                        getOptionLabel={(options) => options.squareNumber}
                                                        value={this.state.squares.square}
                                                        
                                                        />
                                                    </td>
                                                    <td>
                                                        <Query
                                                            query={GET_MACHINES}
                                                            variables={{square}}
                                                        >
                                                        {({loading, error, data, startPolling, stopPolling}) => {
                                                            if(loading) return 'Loading...';
                                                            if(error) return `Error: ${error.message}`;
                                                            const datamachine = data.getMachines
                                                            
                                                            return(
                                                                <Select 
                                                                    onChange={this.getMachines}
                                                                    options={datamachine}
                                                                    components={makeAnimated()}
                                                                    placeholder={'Máquinas'}
                                                                    getOptionValue={(options) => options.id}
                                                                    getOptionLabel={(options) => options.machineNumber}
                                                                    value={this.state.machines.machine}
                                                                />
                                                            );
                                                        }}

                                                        </Query>
                                                    </td>
                                                    <td>
                                                        <Query
                                                            query={GET_OPERATORS}
                                                            variables={{department}}
                                                        >
                                                        {({loading, error, data, startPolling, stopPolling}) => {
                                                            if(loading) return 'Loading...';
                                                            if(error) return `Error: ${error.message}`;
                                                            const dataOperator = data.getOperators;

                                                            return(
                                                                <Select 
                                                                    onChange={this.getOperators}
                                                                    options={dataOperator}
                                                                    components={makeAnimated()}
                                                                    placeholder={'Operadores'}
                                                                    getOptionValue={(options) => options.id}
                                                                    getOptionLabel={(options) => options.name}
                                                                    value={this.state.operators.operator}
                                                                />
                                                            );
                                                        }}

                                                        </Query>
                                                    </td>
                                                    <td>
                                                        <Query
                                                            query={GET_PRODUCTS}
                                                            variables={{machine}}
                                                        >
                                                        {({loading, error, data, startPolling, stopPolling}) => {
                                                            if(loading) return 'Loading...';
                                                            if(error) return `Error: ${error.message}`;
                                                            
                                                            const dataProducts = data.getProducts;

                                                            return(
                                                                <Select 
                                                                    onChange={this.getProducts}
                                                                    options={dataProducts}
                                                                    components={makeAnimated()}
                                                                    placeholder={'Productos'}
                                                                    getOptionValue={(options) => options.id}
                                                                    getOptionLabel={(options) => options.productName}
                                                                    value={this.state.products.product}
                                                                />
                                                            );
                                                        }}
                                                        </Query>
                                                    </td>
                                                    <td>
                                                        <select
                                                            className="form-control"
                                                            onChange={e => {
                                                                if(this.state.operator === ''){
                                                                    this.setState({
                                                                        indicator: "VERDE"
                                                                    });
                                                                }
                                                                this.setState({
                                                                    indicator: e.target.value,
                                                                    indicators: [{indicator: e.target.value}]
                                                                });
                                                            }}
                                                        >
                                                            <option defaultValue="">Color</option>
                                                            <option value="GRIS">GRIS</option>
                                                            <option value="ROJO">ROJO</option>
                                                            <option value="AMARILLO">AMARILLO</option>
                                                            <option value="VERDE">VERDE</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input 
                                                            type="text"
                                                            name="observation"
                                                            className="form-control"
                                                            placeholder="Observación"
                                                            spellCheck="false"
                                                            autoComplete="off"
                                                            onChange={e => {
                                                                this.setState({
                                                                    observation: e.target.value,
                                                                    observations: [{observation: e.target.value}]
                                                                });
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <button
                                            type="submit"
                                            className="btn btn-success font-weight-bold float-right"
                                            disabled={this.validateForm()}
                                        >
                                            <Icon icon={floppyDisk} /> Guardar Registro
                                        </button>

                                        <Link to={'/movilidad'} className="btn btn-danger font-weight-bold float-right mr-2">
                                            <Icon icon={cross} /> Cancelar
                                        </Link>

                                    </form><br></br>

                                </Fragment>
                    
                            );

                        }}
                        </Mutation>
                    )
                }}

                </Query>

                <Query
                    query={GET_MOBILITY}
                    variables={{id}}
                    pollInterval={1000}
                >
                {({loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return 'Loading...';
                    if(error) return `Error: ${error.message}`;
                    return(
                        <MobilityTable 
                            mobility={data.getMobility}
                            id={id}
                        />
                    );
                }}

                </Query>

            </Fragment>
        );
    }
}

export default withRouter(EditFormMobility);