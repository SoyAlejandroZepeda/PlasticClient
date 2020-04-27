import React, { Component, Fragment } from 'react';
import CreateFormMobility from './CreateFormMobility';

//Import Queries
import { Query } from 'react-apollo';
import { GET_DEPARTMENTS_SQUARE } from '../Queries';

class CreateMobility extends Component {
    state = {  }
    render() { 

        const day = this.props.match.params.id;

        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Nuevo registro de movilidad</h2>

                <Query
                    query={GET_DEPARTMENTS_SQUARE}
                    pollInterval={1000}
                >
                {({loading, error, data, refetch, startPolling, stopPolling}) => {
                    if(loading) return ('Loading...');
                    if(error) return `Error: ${error.message}`;

                    return(
                        <CreateFormMobility 
                            department={data.getDepartmentsSquare}
                            day={day}
                            refetch={refetch}
                        />
                    );
                }}

                </Query>
            </Fragment>
        );
    }
}
 
export default CreateMobility;