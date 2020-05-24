import React, { Component, Fragment } from 'react';
import GraphMonth from './GraphMonth';

//Queries
import { Query } from 'react-apollo';
import { GET_WEEKS, GET_MOBILITIES_MONTH } from '../Queries';

class PanelMonth extends Component {
    state = {  }
    render() { 

        const month = this.props.match.url.split('/', 5).pop();
        const department = this.props.match.params.id;

        return ( 
            <Fragment>
                <Query
                    query={GET_WEEKS}
                    variables={{month}}
                    pollInterval={1000}
                >
                {({loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return 'Loading...';
                    if(error) return `Errro: ${error.message}`;
                    const dataWeek = data.getWeeks;
                    
                    const week = []
                    dataWeek.map(item => {
                        week.push(item.id);
                    })

                    return(
                        <Fragment>
                            <Query
                                query={GET_MOBILITIES_MONTH}
                                variables={{week: week, department}}
                                pollInterval={1000}
                            >
                            {({loading, error, data, startPolling, stopPolling}) => {
                                if(loading) return 'Loading...';
                                if(error) return `Errro: ${error.message}`;
                                return(
                                    <GraphMonth 
                                        mobilities = {data.getMobilitiesMonth}
                                        month={month}
                                        department={department}
                                    />
                                )
                            }}

                            </Query>
                        </Fragment>
                    )
                }}

                </Query>
            </Fragment>
        );
    }
}
 
export default PanelMonth;