import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Machines from './Machines';

//Import Queries
import { Query } from 'react-apollo';
import {  GET_SQUARE, GET_MACHINES } from '../Queries';

//Icons
import Icon from 'react-icons-kit';
import {arrowLeft} from 'react-icons-kit/icomoon/arrowLeft';

//Spinner
import '../../spinner.css';

class MachinesSquare extends Component {
    state = {  }
    render() { 

        //Take ID of Square
        const {id} = this.props.match.params;

        return ( 
            <Fragment>
                
                <Query
                    query={GET_SQUARE}
                    variables={{id}}
                >
                {({loading, error, data, refetch}) => {
                    if(loading) return(
                        <Fragment>
                            <div className="sk-cube-grid">
                                <div className="sk-cube sk-cube1"></div>
                                <div className="sk-cube sk-cube2"></div>
                                <div className="sk-cube sk-cube3"></div>
                                <div className="sk-cube sk-cube4"></div>
                                <div className="sk-cube sk-cube5"></div>
                                <div className="sk-cube sk-cube6"></div>
                                <div className="sk-cube sk-cube7"></div>
                                <div className="sk-cube sk-cube8"></div>
                                <div className="sk-cube sk-cube9"></div>
                            </div>
                            <p className="text-center loading-text">Loading...</p>  
                            
                        </Fragment>
                    );

                    if(error) return `Error: ${error.message}`;

                    const square = data.getSquare.id;
                    const department = data.getSquare.department;

                    return(
                        <Fragment>
                            <Link to={`/movilidad/departamentos/${data.getSquare.department}/bloques`} className="btn btn-primary font-weight-bold">
                                <Icon icon={arrowLeft} /> Regresar
                            </Link>

                            <h2 className="text-center mb-3">Máquinas</h2>
                            <h4 className="text-center mb-5">Bloque {data.getSquare.squareNumber} </h4>

                            <div className="row">

                                <Query
                                    query={GET_MACHINES}
                                    pollInterval={1000}
                                    variables={{square}}
                                >
                                {({loading, error, data, startPolling, stopPolling}) => {
                                    if(loading) return(
                                        <Fragment>
                                            <div className="sk-cube-grid">
                                                <div className="sk-cube sk-cube1"></div>
                                                <div className="sk-cube sk-cube2"></div>
                                                <div className="sk-cube sk-cube3"></div>
                                                <div className="sk-cube sk-cube4"></div>
                                                <div className="sk-cube sk-cube5"></div>
                                                <div className="sk-cube sk-cube6"></div>
                                                <div className="sk-cube sk-cube7"></div>
                                                <div className="sk-cube sk-cube8"></div>
                                                <div className="sk-cube sk-cube9"></div>
                                            </div>
                                            <p className="text-center loading-text">Loading...</p>
                                            
                                        </Fragment>
                                    );

                                    if(error) return `Error: ${error.message}`;

                                    return(
                                        data.getMachines.map(machine => (
                                            <Machines 
                                                key={machine.id}
                                                machine={machine}
                                                square={square}
                                                department={department}
                                            />
                                        ))
                                    );
                                }}

                                </Query>

                            </div>

                        </Fragment>
                    )
                }}

                </Query>

            </Fragment>
        );
    }
}
 
export default MachinesSquare;