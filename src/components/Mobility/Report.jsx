import React, { Component, Fragment } from 'react';
import Years from './Years';

//Queries
import { Query } from 'react-apollo';
import { GET_ALL_YEARS } from '../Queries';

class Report extends Component {
    state = {  }
    render() { 
        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Informe de movilidad</h2>

                <Query
                    query={GET_ALL_YEARS}
                    pollInterval={1000}
                >
                {({loading, error, data}) => {
                    if(loading) return('Loading...');
                    if(error) return `Error: ${error.message}`;
                    return(
                        <Years 
                            year={data.getAllYears}
                        />
                    )
                }}

                </Query>
            </Fragment>
        );
    }
}
 
export default Report;