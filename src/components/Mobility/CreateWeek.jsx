import React, { Component, Fragment } from 'react';
import CreateFormWeek from './CreateFormWeek';

//Import Queries
import { Query } from 'react-apollo';
import { GET_MONTH } from '../Queries';

class CreateWeek extends Component {
    state = {  }
    render() { 

        const id = this.props.match.params.id;

        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Nueva Semana</h2>

                <Query
                    query={GET_MONTH}
                    variables={{ id }}
                >
                    {({loading, error, data, refetch}) => {
                    if(loading) return ('Loading...');
                    if(error) return `Error: ${error.message}`;

                        return(
                            <CreateFormWeek 
                                month={data.getMonth}
                                refetch={refetch}
                            />
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}
 
export default CreateWeek;
