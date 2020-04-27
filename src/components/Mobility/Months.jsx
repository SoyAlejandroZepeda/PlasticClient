import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

//Queries
import { Query } from 'react-apollo';
import { GET_MONTHS } from '../Queries';

class Months extends Component {
    state = {  }
    render() { 

        const year = this.props.year

        return ( 
            <Query
                query={GET_MONTHS}
                pollInterval={1000}
                variables={{year}}
            >
            {({loading, error, data}) => {
                if(loading) return('Loading...');
                if(error) return `Error: ${error.message}`;

                return(
                    <Fragment>
                        <table className="table mt-5 col-md-6">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Mes</th>
                                    <th scope="col">Registro</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.getMonths.map(item => {
                                    const {id} = item;

                                    return(
                                        <tr key={id}>
                                            <td> {item.month} </td>
                                            <td>
                                                <Link to={`movilidad/mes/${id}`} className="btn btn-primary btn-block font-weight-bold">
                                                    Abrir registro mensual
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Fragment>
                );
            }}
            </Query>
        );
    }
}
 
export default Months;