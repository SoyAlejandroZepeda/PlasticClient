import React, { Component, Fragment } from 'react';
import Days from './Days';

//Queries
import { Query } from 'react-apollo';
import { GET_DAYS } from '../Queries';

class GetDays extends Component {
    state = {  }
    render() { 

        const week = this.props.match.params.id;

        return ( 
            <Fragment>

                <h2 className="text-center mb-5">Informe Diario</h2>

                <div className="row">
                    <Query
                        query={GET_DAYS}
                        pollInterval={1000}
                        variables={{week}}
                    >
                    {({loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return ('Loading...');
                        if(error) return `Error: ${error.message}`;

                        return(
                            data.getDays.map(day => (
                                <Days 
                                    week={week}
                                    key={day.id}
                                    day={day}
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
 
export default GetDays;