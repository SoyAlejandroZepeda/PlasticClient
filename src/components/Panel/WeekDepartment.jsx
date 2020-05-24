import React, { Component, Fragment } from 'react';
import Departments from './Departments';

//Queries
import { Query } from 'react-apollo';
import { GET_DEPARTMENTS_SQUARE } from '../Queries';

class WeekDepartments extends Component {
    state = {  }
    render() { 

        const week = this.props.match.params.id;

        return ( 
            <Fragment>
                <Query
                    query={GET_DEPARTMENTS_SQUARE}
                    pollInterval={1000}
                >
                {({loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return 'Loading...';
                    if(error) return `Error: ${error.message}`;
                    const dataDepartments = data.getDepartmentsSquare;
                    return(
                        <Fragment>
                            <h2 className="text-center mb-5">Elige un departamento</h2>

                            <div className="table d-flex justify-content-center">
                                <Departments 
                                    departments = {dataDepartments}
                                    week = {week}
                                />
                            </div>
                        </Fragment>
                    );
                }}

                </Query>
            </Fragment>
        );
    }
}
 
export default WeekDepartments;