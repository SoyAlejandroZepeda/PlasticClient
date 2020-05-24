import React, { Component, Fragment } from 'react';
import GraphDay from './GraphDay';

//Queries
import { Query } from 'react-apollo';
import { GET_MOBILITY } from '../Queries';

class PanelDay extends Component {
    state = {  }
    render() { 

        //Take ID
        const {id} = this.props.match.params;

        const department = this.props.match.url.split('/', 7).pop();
        const day = this.props.match.url.split('/', 9).pop();

        return ( 
            <Fragment>
                <Query
                    query={GET_MOBILITY}
                    variables={{id}}
                    pollInterval={1000}
                >
                {({loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return 'Loading...';
                    if(error) return `Error: ${error.message}`;
                    return(
                        <GraphDay 
                            mobility={data.getMobility}
                            id={id}
                            department={department}
                            day={day}
                        />
                    );
                }}

                </Query>
            </Fragment>
        );
    }
}
 
export default PanelDay;