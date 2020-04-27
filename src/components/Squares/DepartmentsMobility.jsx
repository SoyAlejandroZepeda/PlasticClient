import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

//Queries
import {Query} from 'react-apollo';
import {GET_DEPARTMENTS_SQUARE} from '../Queries';

//Spinner
import '../../spinner.css';

class DepartmentsMobility extends Component {
    state = {  }
    render() { 
        return ( 

            <Fragment>
                <h2 className="text-center mb-5">Eliga un departamento</h2>

                <Query
                    query={GET_DEPARTMENTS_SQUARE}
                    pollInterval={1000}
                >
                {({loading, error, data, startPolling, stopPolling}) => {
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

                    return(
                        <Fragment>
                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Departamento</th>
                                        <th scope="col">Bloque</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.getDepartmentsSquare.map(item => {

                                        const {id} = item;

                                        return (
                                            <tr key={id}>
                                                <td> { item.departmentName } </td>
                                                <td>
                                                    <Link to={`/movilidad/departamentos/${id}/bloques`} className="btn btn-success font-weight-bold">
                                                        Mostrar Bloques
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </Fragment>
                    )
                }}

                </Query>
            </Fragment>

        );
    }
}
 
export default DepartmentsMobility;