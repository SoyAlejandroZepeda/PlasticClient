import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

//Import Queries & Mutations
import { Query, Mutation } from 'react-apollo';

import { GET_DEPARTMENTS } from '../Queries';
import { DELETE_DEPARTMENT } from '../Mutations';

//Paginator
import Paginator from '../Paginator';

//Alert
import Successfully from '../Alerts/Successfully';

//Icons
import Icon from 'react-icons-kit';
import {plus} from 'react-icons-kit/icomoon/plus';
import {pencil} from 'react-icons-kit/icomoon/pencil';
import {cross} from 'react-icons-kit/icomoon/cross';

//Spinner
import '../../spinner.css';

class Departments extends Component {

    limit = 10;

    state = { 
        paginator: {
            offset: 0,
            current: 1
        },

        alert: {
            show: false,
            message: ''
        }
    }

    previousPage = () => {
        this.setState({
            paginator: {
                offset: this.state.paginator.offset - this.limit,
                current: this.state.paginator.current - 1
            }
        });
    }

    nextPage = () => {
        this.setState({
            paginator: {
                offset: this.state.paginator.offset + this.limit,
                current: this.state.paginator.current + 1
            }
        });
    }

    render() { 

        const {alert: {show, message}} = this.state;
        const alert = (show) ? <Successfully message={message} /> : '';

        return ( 

            <Fragment>

                <Link to={'/departamentos/nuevo'} 
                    className="btn btn-primary float-right font-weight-bold">
                    <Icon icon={plus} /> Nuevo Departamento
                </Link><br></br><br></br>

                <h2 className="text-center mb-5">Departamentos</h2>

                {alert}

                <Query
                    query={GET_DEPARTMENTS}
                    pollInterval={1000}
                    variables={{limit: this.limit, offset: this.state.paginator.offset}}
                >
                {({loading, error, data, starPolling, stopPolling}) => {
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
                
                    return (
                        <Fragment>
                        <table className="table">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Departamento</th>
                                    <th scope="col">Editar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.getDepartments.map(item => {

                                    const {id} = item;
                                    
                                    return (

                                        <tr key={id}>
                                            <td>{ item.departmentName } </td>
                                            <td>
                                                <Link to={`/departamentos/editar/${id}`} className="btn btn-warning font-weight-bold">
                                                    <Icon icon={pencil} /> Editar Departamento
                                                </Link>
                                            </td>

                                            <td>
                                                <Mutation
                                                    mutation={ DELETE_DEPARTMENT }
                                                    onCompleted={(data) => {
                                                        this.setState({
                                                            alert: {
                                                                show: true,
                                                                message: data.deleteDepartment
                                                            }
                                                        }, () => {
                                                            setTimeout(() => {
                                                                this.setState({
                                                                    alert: {
                                                                        show: false,
                                                                        message: ''
                                                                    }
                                                                });
                                                            }, 3000);
                                                        });
                                                    }}
                                                >
                                                {deleteDepartment => (
                                                    <button
                                                        onClick={() => {
                                                            if(window.confirm('¿Desea eliminar este departamento?')){
                                                                deleteDepartment({
                                                                    variables: {id}
                                                                });
                                                            }
                                                        }}
                                                        type="button"
                                                        className="btn btn-danger font-weight-bold"
                                                    >
                                                        <Icon icon={cross} /> Eliminar Departamento
                                                    </button>
                                                )}
                                                </Mutation>
                                            </td>

                                        </tr>

                                    )
                                })}
                            </tbody>

                        </table>
                        
                        <Paginator 
                            current = { this.state.paginator.current }
                            total= { data.totalDepartments }
                            limit = { this.limit }
                            previousPage = { this.previousPage }
                            nextPage = { this.nextPage }
                        />
                        
                        <p className="font-weight-bold">Total de departamentos:  
                        { data.totalDepartments } de { data.totalDepartments}</p>
                        </Fragment>
                        
                    )
                }}
                </Query>

            </Fragment>

        );
    }
}
 
export default Departments;
