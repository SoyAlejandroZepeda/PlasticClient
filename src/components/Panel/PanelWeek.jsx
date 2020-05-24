import React, { Component, Fragment } from 'react';
import GraphWeek from './GraphWeek';

//Queries
import { Query } from 'react-apollo';
import { GET_DAYS, GET_MOBILITIES_WEEK } from '../Queries';

class PanelWeek extends Component {
    state = {  }
    render() { 

        const week = this.props.match.url.split('/', 5).pop();
        const department = this.props.match.params.id;

        return ( 
            <Fragment>
                <Query
                    query={GET_DAYS}
                    variables={{week}}
                    pollInterval={1000}
                >
                {({loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return 'Loading...';
                    if(error) return `Errro: ${error.message}`;
                    const dataDay = data.getDays;
                    
                    const day = []
                    dataDay.map(item => {
                        day.push(item.id);
                    })

                    return(
                        <Fragment>
                            <Query
                                query={GET_MOBILITIES_WEEK}
                                variables={{day: day, department}}
                                pollInterval={1000}
                            >
                            {({loading, error, data, startPolling, stopPolling}) => {
                                if(loading) return 'Loading...';
                                if(error) return `Errro: ${error.message}`;
                                return(
                                    <GraphWeek 
                                        mobilities = {data.getMobilitiesWeek}
                                        week={week}
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
 
export default PanelWeek;