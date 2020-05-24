import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ButtonStatus from './ButtonStatus';

//Import Queries
import { Query } from 'react-apollo';
import { GET_ALL_OPERATORS, GET_MACHINE } from '../Queries';

//Icons
import Icon from 'react-icons-kit';
import {plus} from 'react-icons-kit/icomoon/plus';

//Spinner
import '../../spinner.css';

class Operators extends Component {
    state = { 

    }

    render() { 
        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Operadores</h2>

                <Query
                    query={GET_ALL_OPERATORS}
                    pollInterval={1000}
                >
                {({loading, error, data}) => {
                    if(loading) return (
                        <Fragment>
                            <div className="sk-cube-grid">
                                <div className="sk-cube sk-cube1"></div>
                                <div className="sk-cube sk-cube2"></div>
                                <div className="sk-cube sk-cube3"></div>
                                <div className="sk-cube sk-cube4"></div>
                                <div className="sk-cube sk-cube5"></div>
                                <div className="sk-cube sk-cube6"></div>
                                <div className="sk-cube sk-cube7"></div>
                                <div className="sk-cube sk-cube8"></div>
                                <div className="sk-cube sk-cube9"></div>
                            </div>
                            <p className="text-center loading-text">Loading...</p>
                            
                        </Fragment>
                    );
                    if(error) return `Error: ${error.message}`;
                    const dataOperators = data.getAllOperators;

                    return (
                        <Fragment>
                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Número de Nomina</th>
                                        <th scope="col">Operador</th>
                                        <th scope="col">Asignar</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Máquina</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {dataOperators.map(item => {

                                        const {id} = item;

                                        return(

                                            <tr key={id}>
                                                <td> {item.payroll} </td>
                                                <td> {item.name} {item.surnameP} {item.surnameM} </td>
                                                <td> 
                                                    <Link to={`/movilidad/operadores/editar/${id}`}
                                                        className="btn btn-primary font-weight-bold"
                                                    >
                                                        <Icon icon={plus} /> Asignar Máquina
                                                    </Link> 
                                                </td>
                                                <td> 
                                                    <ButtonStatus 
                                                        key={item.id}
                                                        operators={item}
                                                    />
                                                </td>
                                                <td>
                                                    {
                                                        item.machine
                                                    }
                                                </td>
                                                
                                            </tr>

                                        )

                                    })}

                                </tbody>
                            </table>
                        </Fragment>
                    );
                }}

                </Query>
            </Fragment>
        );
    }
}
 
export default Operators;