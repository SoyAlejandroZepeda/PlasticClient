import React, { Component, Fragment } from 'react';
import Weeks from './Weeks';

//Import Queries
import { Query } from 'react-apollo';
import { GET_WEEKS } from '../Queries';

class GetWeeks extends Component {
    state = {  }
    render() {
        
        const month = this.props.match.params.id;

        return ( 
            <Fragment>

                <h2 className="text-center mb-5">Informe Semanal</h2>

                <div className="row">
                    <Query
                        query={GET_WEEKS}
                        pollInterval={1000}
                        variables={{month}}
                    >
                    {({loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return ('Loading...');
                        if(error) return `Error: ${error.message}`;

                        return(
                            data.getWeeks.map(week => (
                                <Weeks 
                                    month={month}
                                    key={week.id}
                                    week={week}
                                />
                            ))
                        );
                    }}

                    </Query>
                </div>
            </Fragment>
        );
    }
}
 
export default GetWeeks;