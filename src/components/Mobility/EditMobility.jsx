import React, { Component, Fragment } from 'react';
import EditFormMobility from './EditFormMobility';

//Queries
import { Query } from 'react-apollo';
import { GET_MOBILITY } from '../Queries';

class EditMobility extends Component {
    state = {  }
    render() {

        //Take ID Mobility
        const id = this.props.match.params.id;

        return (
            <Fragment>
                <h2 className="text-center mb-5">Registro de Movilidad</h2>
                <Query
                    query={GET_MOBILITY}
                    variables={{id}}
                >
                {({loading, error, data, refetch}) => {
                    if(loading) return 'Loading...';
                    if(error) return `Error: ${error.message}`;
                    return(
                        <EditFormMobility 
                            mobility={data}
                            id={id}
                            refetch={refetch}
                        />
                    );
                }}

                </Query>
            </Fragment>
        );
    }
}

export default EditMobility;