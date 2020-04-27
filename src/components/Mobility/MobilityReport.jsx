import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Mobility from './Mobility';

//Queries
import { Query } from 'react-apollo';
import { GET_DAY, GET_MOBILITIES, GET_DEPARTMENT } from '../Queries';

//Icons
import Icon from 'react-icons-kit';
import {plus} from 'react-icons-kit/icomoon/plus';

class MobilityReport extends Component {
    state = {  }
    render() { 

        const id = this.props.match.params.id;
        const day = id;

        return ( 
            <Fragment>
                <Query
                    query={GET_DAY}
                    variables={{id}}
                >
                {({loading, error, data}) => {
                    if(loading) return ('Loading...');
                    if(error) return `Error: ${error.message}`;

                    const id = data.getDay.id;
                    const dayNumber = data.getDay.dayNumber
                    const dayName = data.getDay.dayName;

                    return(
                        <Fragment>

                    <Link to={`/movilidad/nuevo/dia/${id}`} 
                        className="btn btn-primary float-right font-weight-bold">
                        <Icon icon={plus} /> Crear Registro
                    </Link><br></br><br></br>

                            <h2 className="text-center mb-3">Informe de movilidad</h2>
                            <h4 className="text-center mb-5"> {dayName} {dayNumber} </h4>
                        </Fragment>
                    )
                }}

                </Query>

                <div className="row">
                    <Query
                        query={GET_MOBILITIES}
                        pollInterval={1000}
                        variables={{day}}
                    >
                    {({loading, error, data, refetch, startPolling, stopPolling}) => {
                        if(loading) return('Loading...');   
                        if(error) return `Error: ${error.message}`;
                        return(
                            data.getMobilities.map(mobility => (
                                <Mobility 
                                    key={mobility.id}
                                    mobility={mobility}
                                    department={mobility.department}
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
 
export default MobilityReport;