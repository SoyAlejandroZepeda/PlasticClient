import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'; 

//Import Queries
import { Query } from 'react-apollo';
import { GET_DEPARTMENT } from '../Queries';

class Mobility extends Component {
    state = {  }
    render() { 

        const id = this.props.department;
        const mobility = this.props.mobility;
        const week = this.props.week;
        const day = this.props.day;

        const date = new Date(Number(mobility.register));

        return ( 
            <Fragment>
                <Query
                    query={GET_DEPARTMENT}
                    variables={{id}}
                >
                {({loading, error, data}) => {
                    if(loading) return('Loading...');
                    if(error) return `Error: ${error.message}`;
                    const departmentData = data.getDepartment
                    return (
                        <div className="col-md-4">
                            <div className={`card mb-3`}>
                                <div className="card-body text-center border border-dark">
                                    <p className="card-text font-weight-bold">Departamento: 
                                        <span className="font-weight-normal"> {departmentData.departmentName} </span>
                                    </p>
                                    <p className="card-text font-weight-bold">Hora de Registro: 
                                        <span className="font-weight-normal"> {date.toLocaleString("es-MX")} </span>
                                    </p>
                                    <Link to={`/movilidad/editar/semana/${week}/id/${mobility.id}`}
                                        className="btn btn-outline-primary font-weight-bold d-block my-3"
                                    >
                                        Iniciar Movilidad
                                    </Link>
                                    <Link to={`/movilidad/grafica/semana/${week}/departamento/${departmentData.id}/dia/${day}/id/${mobility.id}`}
                                        className="btn btn-outline-success font-weight-bold d-block mb-2"
                                    >
                                        Consultar Gráfico
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                }}

                </Query>
            </Fragment>
        );
    }
}
 
export default withRouter(Mobility);