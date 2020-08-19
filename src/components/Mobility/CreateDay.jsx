import React, { Component, Fragment } from 'react';
import CreateFormDay from './CreateFormDay';

//Import Queries
import { Query } from 'react-apollo';
import { GET_WEEK } from '../Queries';

class CreateDay extends Component {
    state = {  }
    render() { 

        const id = this.props.match.params.id
        const month = this.props.match.url.split('/', 4).pop();

        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Nuevo Día</h2>

                <Query
                    query={GET_WEEK}
                    variables={{ id }}
                >
                    {({loading, error, data, refetch}) => {
                    if(loading) return ('Loading...');
                    if(error) return `Error: ${error.message}`;
                    console.log(data)

                        return(
                            <CreateFormDay 
                                month={month}
                                week={data.getWeek}
                                refetch={refetch}
                            />
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}
 
export default CreateDay;
